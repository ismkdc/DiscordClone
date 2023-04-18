using System.Text.Json;
using Common.Domain.Dtos;
using Common.Infrastructure.Abstraction.Authentication;
using StackExchange.Redis.Extensions.Core.Abstractions;
using WriteApi.Domain.Dtos;
using WriteApi.Domain.Events;
using WriteApi.Infrastructure.Channels;

namespace WriteApi.Infrastructure.Services;

public class SessionService
{
    private readonly CentrifugoWriteChannel _centrifugoWriteChannel;
    private readonly IJwtProvider _jwtProvider;
    private readonly IRedisClient _redisClient;

    public SessionService(IRedisClient redisClient, IJwtProvider jwtProvider,
        CentrifugoWriteChannel centrifugoWriteChannel)
    {
        _redisClient = redisClient;
        _jwtProvider = jwtProvider;
        _centrifugoWriteChannel = centrifugoWriteChannel;
    }

    public async Task<SessionResponse> Create()
    {
        var user = User.Generate();
        var jwt = _jwtProvider.Encode(user);

        var json = JsonSerializer.Serialize(user);

        await _redisClient.Db0.Database.ListRightPushAsync("online-users", json);
        await _centrifugoWriteChannel.WriteAsync(new CentrifugoPublishEvent(user, "online-users"));

        return new SessionResponse(user, jwt);
    }

    public async Task<object> Kill()
    {
        // Todo: Implement
        throw new NotImplementedException();
    }
}