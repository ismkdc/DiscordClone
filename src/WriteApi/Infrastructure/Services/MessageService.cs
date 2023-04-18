using Common.Domain.Dtos;
using Common.Infrastructure.Abstraction.Authentication;
using WriteApi.Domain.Dtos;
using WriteApi.Domain.Events;
using WriteApi.Infrastructure.Channels;

namespace WriteApi.Infrastructure.Services;

public class MessageService
{
    private readonly CentrifugoWriteChannel _centrifugoWriteChannel;
    private readonly MongoWriteChannel _mongoWriteChannel;
    private readonly RedisWriteChannel _redisWriteChannel;
    private readonly ITokenProvider<User> _tokenProvider;

    public MessageService(ITokenProvider<User> tokenProvider, RedisWriteChannel redisWriteChannel,
        MongoWriteChannel mongoWriteChannel, CentrifugoWriteChannel centrifugoWriteChannel)
    {
        _tokenProvider = tokenProvider;
        _redisWriteChannel = redisWriteChannel;
        _mongoWriteChannel = mongoWriteChannel;
        _centrifugoWriteChannel = centrifugoWriteChannel;
    }

    public async Task Create(MessageRequest message)
    {
        var user = _tokenProvider.Validated;
        var msgObj = new Message(Guid.NewGuid(), user, message.Message, DateTime.UtcNow);

        await _centrifugoWriteChannel.WriteAsync(new CentrifugoPublishEvent(msgObj, "messages"));
        await _mongoWriteChannel.WriteAsync(msgObj);
        await _redisWriteChannel.WriteAsync(msgObj);
    }
}