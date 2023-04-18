using System.Threading.Channels;

namespace WriteApi.Infrastructure.Channels;

public abstract class BaseChannel<T>
{
    private readonly Channel<T> _channel;

    protected BaseChannel()
    {
        _channel = Channel.CreateUnbounded<T>();
    }

    public ValueTask WriteAsync(T message)
    {
        return _channel.Writer.WriteAsync(message);
    }

    public IAsyncEnumerable<T> ReadAllAsync()
    {
        return _channel.Reader.ReadAllAsync();
    }
}