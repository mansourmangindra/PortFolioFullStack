using Portfolio.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Domain.Entities
{
    public class Experience : BaseEntity
    {
        public string Company { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty; // e.g., "Jan 2023" or ISO string
        public string EndDate { get; set; } = string.Empty;   // e.g., "Present"
        public bool IsCurrentRole { get; set; }
        public List<string> Highlights { get; set; } = new();
    }
}
