using Portfolio.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Domain.Entities
{
    public class Project : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string LongDescription { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
        public string GithubLink { get; set; } = string.Empty;
        public string LiveDemoLink { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public int DisplayOrder { get; set; }
    }
}
