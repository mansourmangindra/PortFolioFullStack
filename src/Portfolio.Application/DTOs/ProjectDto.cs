using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.DTOs
{
    public class ProjectDto
    {
        public string Id { get; set; } = string.Empty;
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

    public class UpsertProjectDto
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
