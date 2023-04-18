namespace WriteApi.Domain.Events;

public record CentrifugoPublishEvent(object Message, string Channel);