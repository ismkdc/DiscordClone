using System.Text;
using System.Text.Json;
using Centrifugo.AspNetCore.Abstractions;
using Common.Domain.Dtos;
using StackExchange.Redis.Extensions.Core.Abstractions;
using WriteApi.Domain.Events;
using WriteApi.Infrastructure.Channels;

namespace WriteApi.Infrastructure.BackgroundWorkers;

public class SessionKillBgWorker : BackgroundService
{
    private readonly ICentrifugoClient _centrifugoClient;
    private readonly CentrifugoWriteChannel _centrifugoWriteChannel;
    private readonly IRedisClient _redisClient;

    public SessionKillBgWorker(IRedisClient redisClient, ICentrifugoClient centrifugoClient,
        CentrifugoWriteChannel centrifugoWriteChannel)
    {
        _redisClient = redisClient;
        _centrifugoClient = centrifugoClient;
        _centrifugoWriteChannel = centrifugoWriteChannel;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var socketChannels = await _centrifugoClient.Channels();

            var onlineUsersOnSocket = socketChannels
                .Result
                .Channels
                .Select(x => x.Key)
                .ToArray();

            var socketUserIdList = new List<Guid>();
            foreach (var onlineUserOnSocket in onlineUsersOnSocket)
            {
                if (Guid.TryParse(onlineUserOnSocket, out var userId))
                    socketUserIdList.Add(userId);
            }

            if (socketUserIdList.Any())
            {
                var onlineUsersOnRedis = await _redisClient.Db0.Database.ListRangeAsync("online-users");
                var userList = onlineUsersOnRedis
                    .Select(x => x.ToString())
                    .Select(x => JsonSerializer.Deserialize<User>(x))
                    .ToList();

                foreach (var user in userList.Where(user => !socketUserIdList.Contains(user.Id)))
                {
                    user.IsOnline = false;
                    
                    await _redisClient.Db0.RemoveAsync($"sessions:{user.Id}");
                    await _centrifugoWriteChannel.WriteAsync(new CentrifugoPublishEvent(new { Id = user.Id },
                        "del-online-user"));

                    Console.WriteLine($"Killed session: {JsonSerializer.Serialize(user)}");
                }

                await _redisClient.Db0.Database.KeyDeleteAsync("online-users");
                
                await Task.WhenAll
                (
                    userList.Select(u =>
                        _redisClient.Db0.Database.ListRightPushAsync("online-users", JsonSerializer.Serialize(u)))
                );
            }

            await Task.Delay(60 * 1000 * 10, stoppingToken);
        }
    }
}