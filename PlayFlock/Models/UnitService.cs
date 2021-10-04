using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;

namespace PlayFlock.Models
{
    public class UnitService
    {
        IMongoCollection<Unit> Units;
        public UnitService(IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString("MongoDBUnits");
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("Characters");
            Units = database.GetCollection<Unit>("Units");
        }

        public async Task<IEnumerable<Unit>> GetUnitList()
        {
            var builder = new FilterDefinitionBuilder<Unit>();
            var filter = builder.Empty;
            return await Units.Find(filter).ToListAsync();
        }

        public async Task AddUnitToDB(Unit u)
        {
            await Units.InsertOneAsync(u);
        }

        public async Task UpdateUnitInfo(Unit u)
        {
            var builder = new FilterDefinitionBuilder<Unit>();
            var updateBuilder = new UpdateDefinitionBuilder<Unit>();
            var filter = builder.Where(unit => unit.Id == u.Id);
            await Units.ReplaceOneAsync(filter, u);
        }

        public async Task<Unit> GetUnit(string id)
        {
             return await Units.AsQueryable().FirstAsync(u => u.Id == id);
        }
        public async Task RemoveUnitFromDB(string id)
        {
            var builder = new FilterDefinitionBuilder<Unit>();
            var filter = builder.Where(unit => unit.Id == id);
            await Units.DeleteOneAsync(filter);
        }
    }
}
