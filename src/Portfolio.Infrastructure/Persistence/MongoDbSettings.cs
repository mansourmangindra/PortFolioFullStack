using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Infrastructure.Persistence
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}
