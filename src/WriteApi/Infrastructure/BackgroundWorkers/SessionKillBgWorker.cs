using System.Text;
using Centrifugo.AspNetCore.Abstractions;
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
            
            var onlineUsersFromSocket = socketChannels
                .Result
                .Channels
                .Select(x => x.Key)
                .Where(x => x.StartsWith("user-"))
                .Select(x => x[5..])
                .Select(x => Encoding.UTF8.GetString(Convert.FromBase64String(x)));

            var onlineUsersFromRedis = await _redisClient.Db0.Database.ListRangeAsync("online-users");

            var toKilledUsers = onlineUsersFromRedis
                .Select(x => x.ToString())
                .Where(x => !onlineUsersFromSocket.Contains(x));

            foreach (var killedUser in toKilledUsers)
            {
                await _redisClient.Db0.Database.ListRemoveAsync("online-users", killedUser);
                await _centrifugoWriteChannel.WriteAsync(new CentrifugoPublishEvent(new { KilledUser = killedUser },
                    "del-online-user"));

                Console.WriteLine($"Killed session: {killedUser}");
            }

            await Task.Delay(60 * 1000, stoppingToken);
        }
    }
}