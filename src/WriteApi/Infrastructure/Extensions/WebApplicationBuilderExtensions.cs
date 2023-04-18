using Common.Infrastructure.Extensions;
using WriteApi.Infrastructure.Settings;

namespace WriteApi.Infrastructure.Extensions;

public static class WebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ConfigureApiSettings(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<MongoDbSettings>(
            builder.Configuration.GetSection("MongoDbSettings")
        );

        builder.ConfigureJwtSettings();

        return builder;
    }
}