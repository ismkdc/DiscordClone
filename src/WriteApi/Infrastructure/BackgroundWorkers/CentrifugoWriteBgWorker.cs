using System.Text.Json;
using Centrifugo.AspNetCore.Abstractions;
using Centrifugo.AspNetCore.Extensions;
using WriteApi.Infrastructure.Channels;

namespace WriteApi.Infrastructure.BackgroundWorkers;

public class CentrifugoWriteBgWorker : BackgroundService
{
    private readonly ICentrifugoClient _centrifugoClient;
    private readonly CentrifugoWriteChannel _channel;

    public CentrifugoWriteBgWorker(CentrifugoWriteChannel channel, ICentrifugoClient centrifugoClient)
    {
        _channel = channel;
        _centrifugoClient = centrifugoClient;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var message in _channel.ReadAllAsync().WithCancellation(stoppingToken))
        {
            await _centrifugoClient.Publish(message.Message, message.Channel);
            Console.WriteLine($"Write message to Centrifugo: {JsonSerializer.Serialize(message)}");
        }
    }
}