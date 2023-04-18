using System.Text.Json;
using Common.Domain.Dtos;
using StackExchange.Redis;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace ReadApi.Infrastructure.Services;

public class MessageService
{
    private readonly IRedisClient _redisClient;

    public MessageService(IRedisClient redisClient)
    {
        _redisClient = redisClient;
    }

    public async IAsyncEnumerable<Message> List()
    {
        var messages = await _redisClient.Db0.Database.ListRangeAsync("messages", flags: CommandFlags.PreferReplica);

        foreach (var message in messages) yield return JsonSerializer.Deserialize<Message>(message);
    }
}