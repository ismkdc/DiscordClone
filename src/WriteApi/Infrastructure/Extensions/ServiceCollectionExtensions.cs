using Common.Domain.Dtos;
using Common.Infrastructure.Abstraction.Authentication;
using WriteApi.Infrastructure.BackgroundWorkers;
using WriteApi.Infrastructure.Channels;
using WriteApi.Infrastructure.Providers;
using WriteApi.Infrastructure.Services;

namespace WriteApi.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddSingleton<MongoDbProvider<Message>>();

        services.AddSingleton<RedisWriteChannel>();
        services.AddSingleton<MongoWriteChannel>();
        services.AddSingleton<CentrifugoWriteChannel>();

        services.AddScoped<ITokenProvider<User>, TokenProvider<User>>();
        services.AddScoped<SessionService>();
        services.AddScoped<MessageService>();

        services.AddHostedService<RedisWriteBgWorker>();
        services.AddHostedService<MongoWriteBgWorker>();
        services.AddHostedService<CentrifugoWriteBgWorker>();

        return services;
    }
}