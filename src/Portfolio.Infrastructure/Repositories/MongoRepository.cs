using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Common;
using Portfolio.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Portfolio.Infrastructure.Repositories
{
    public class MongoRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly IMongoCollection<T> _collection;

        public MongoRepository(IMongoClient mongoClient, Microsoft.Extensions.Options.IOptions<Persistence.MongoDbSettings> settings)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            var collectionName = typeof(T).Name.ToLowerInvariant() + "s";
            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return await _collection.Find(_ => true).ToListAsync(cancellationToken);
        }

        public async Task<T?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<IEnumerable<T>> FindAsync(System.Linq.Expressions.Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return await _collection.Find(predicate).ToListAsync(cancellationToken);
        }

        public async Task AddAsync(T entity, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrEmpty(entity.Id))
            {
                entity.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
            }
            await _collection.InsertOneAsync(entity, null, cancellationToken);
        }

        public async Task UpdateAsync(string id, T entity, CancellationToken cancellationToken = default)
        {
            await _collection.ReplaceOneAsync(x => x.Id == id, entity, cancellationToken: cancellationToken);
        }

        public async Task DeleteAsync(string id, CancellationToken cancellationToken = default)
        {
            await _collection.DeleteOneAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<bool> ExistsAsync(System.Linq.Expressions.Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        {
            var count = await _collection.CountDocumentsAsync(predicate, cancellationToken: cancellationToken);
            return count > 0;
        }
    }
}
