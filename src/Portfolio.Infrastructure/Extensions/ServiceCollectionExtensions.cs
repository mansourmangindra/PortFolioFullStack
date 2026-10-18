using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Portfolio.Domain.Common; // <-- Make sure this namespace is included
using Portfolio.Infrastructure.Persistence;
using Portfolio.Infrastructure.Repositories;
namespace Portfolio.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Bind MongoDB settings
            services.Configure<MongoDbSettings>(configuration.GetSection("MongoDbSettings"));

            // Register Singleton IMongoClient
            services.AddSingleton<IMongoClient>(sp =>
            {
                var connectionString = configuration["MongoDbSettings:ConnectionString"]
                                       ?? "mongodb://localhost:27017";
                return new MongoClient(connectionString);
            });

            // Register Generic Repository (Fixed typo from IRepositor to IRepository)
            services.AddScoped(typeof(IRepository<>), typeof(MongoRepository<>));

            return services;
        }
    }
}