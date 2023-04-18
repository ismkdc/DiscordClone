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
            var channels = await _centrifugoClient.Channels();
            var userChannels = channels
                .Result
                .Channels
                .Select(x => x.Key)
                .Where(x => x.StartsWith("user-"));

            foreach (var userChannel in userChannels)
            {
                var userId = userChannel[5..];
                var base64DecodedString = Encoding.UTF8.GetString(Convert.FromBase64String(userId));

                await _redisClient.Db0.Database.ListRemoveAsync("online-users", base64DecodedString);
                await _centrifugoWriteChannel.WriteAsync(new CentrifugoPublishEvent(new { Id = userId },
                    "del-online-user"));
                
                Console.WriteLine($"Killed session: {base64DecodedString}");
            }

            await Task.Delay(60 * 1000, stoppingToken);
        }
    }
}