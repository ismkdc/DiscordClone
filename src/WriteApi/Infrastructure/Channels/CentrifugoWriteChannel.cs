using WriteApi.Domain.Events;

namespace WriteApi.Infrastructure.Channels;

public class CentrifugoWriteChannel : BaseChannel<CentrifugoPublishEvent>
{
}