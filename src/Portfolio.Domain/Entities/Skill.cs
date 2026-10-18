using Portfolio.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Domain.Entities
{
    public class Skill : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // e.g., "Frontend", "Backend", "Database", "DevOps"
        public int ProficiencyLevel { get; set; }            // e.g., 1 to 100 or 1 to 5
        public string IconUrl { get; set; } = string.Empty;
    }
}
