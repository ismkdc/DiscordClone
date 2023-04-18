using System.Text.Json;
using StackExchange.Redis.Extensions.Core.Abstractions;
using WriteApi.Infrastructure.Channels;

namespace WriteApi.Infrastructure.BackgroundWorkers;

public class RedisWriteBgWorker : BackgroundService
{
    private readonly RedisWriteChannel _channel;
    private readonly IRedisClient _redisClient;

    public RedisWriteBgWorker(RedisWriteChannel channel, IRedisClient redisClient)
    {
        _channel = channel;
        _redisClient = redisClient;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var message in _channel.ReadAllAsync().WithCancellation(stoppingToken))
        {
            var json = JsonSerializer.Serialize(message);
            await _redisClient.Db0.Database.ListRightPushAsync("messages", json);

            Console.WriteLine($"Write message to Redis: {JsonSerializer.Serialize(message)}");
        }
    }
}