using System.Text.Json;
using Common.Domain.Dtos;
using Common.Infrastructure.Abstraction.Authentication;
using StackExchange.Redis;
using StackExchange.Redis.Extensions.Core.Abstractions;

namespace ReadApi.Infrastructure.Services;

public class SessionService
{
    private readonly IRedisClient _redisClient;
    private readonly ITokenProvider<User> _tokenProvider;

    public SessionService(ITokenProvider<User> tokenProvider, IRedisClient redisClient)
    {
        _tokenProvider = tokenProvider;
        _redisClient = redisClient;
    }

    public async Task<User> Me()
    {
        var user = _tokenProvider.Validated;
        var session = await _redisClient.Db0.GetAsync<string>($"sessions:{user.Id}", flag: CommandFlags.PreferReplica);

        if (session is null) throw new UnauthorizedAccessException();

        return user;
    }

    public async IAsyncEnumerable<User> List()
    {
        var users = await _redisClient.Db0.Database.ListRangeAsync("online-users", flags: CommandFlags.PreferReplica);

        foreach (var user in users) yield return JsonSerializer.Deserialize<User>(user);
    }
}