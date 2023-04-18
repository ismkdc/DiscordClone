using Common.Domain.Dtos;
using Common.Infrastructure.Abstraction.Authentication;
using ReadApi.Infrastructure.Providers;
using ReadApi.Infrastructure.Services;

namespace ReadApi.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenProvider<User>, TokenProvider<User>>();
        services.AddScoped<SessionService>();
        services.AddScoped<MessageService>();

        return services;
    }
}