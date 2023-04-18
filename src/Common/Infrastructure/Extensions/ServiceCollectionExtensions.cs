using Common.Infrastructure.Abstraction.Authentication;
using Common.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis.Extensions.Core.Configuration;
using StackExchange.Redis.Extensions.System.Text.Json;

namespace Common.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRedis(this IServiceCollection services, string? connectionString)
    {
        services.AddStackExchangeRedisExtensions<SystemTextJsonSerializer>(new RedisConfiguration
        {
            ConnectionString = connectionString,
            PoolSize = 5,
            ServerEnumerationStrategy = new ServerEnumerationStrategy
            {
                Mode = ServerEnumerationStrategy.ModeOptions.All,
                TargetRole = ServerEnumerationStrategy.TargetRoleOptions.Any,
                UnreachableServerAction = ServerEnumerationStrategy.UnreachableServerActionOptions.Throw
            }
        });

        return services;
    }

    public static IServiceCollection AddJwtProvider(this IServiceCollection services)
    {
        services.AddSingleton<IJwtProvider, JwtProvider>();

        return services;
    }
}