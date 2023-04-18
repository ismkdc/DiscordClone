using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WriteApi.Infrastructure.Settings;

namespace WriteApi.Infrastructure.Providers;

public class MongoDbProvider<T>
{
    public MongoDbProvider(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        Collection = database.GetCollection<T>(typeof(T).Name);
    }

    public IMongoCollection<T> Collection { get; private set; }
}