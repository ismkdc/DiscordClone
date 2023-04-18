using System.Text.Json;
using Common.Domain.Dtos;
using WriteApi.Infrastructure.Channels;
using WriteApi.Infrastructure.Providers;

namespace WriteApi.Infrastructure.BackgroundWorkers;

public class MongoWriteBgWorker : BackgroundService
{
    private readonly MongoWriteChannel _channel;
    private readonly MongoDbProvider<Message> _mongoDbProvider;

    public MongoWriteBgWorker(MongoWriteChannel channel, MongoDbProvider<Message> mongoDbProvider)
    {
        _channel = channel;
        _mongoDbProvider = mongoDbProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var message in _channel.ReadAllAsync().WithCancellation(stoppingToken))
        {
            await _mongoDbProvider.Collection.InsertOneAsync(message, cancellationToken: stoppingToken);
            Console.WriteLine($"Write message to Mongo: {JsonSerializer.Serialize(message)}");
        }
    }
}