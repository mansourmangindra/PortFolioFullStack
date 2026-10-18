using Portfolio.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Domain.Entities
{
    public class Profile : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string GithubUrl { get; set; } = string.Empty;
        public string LinkedinUrl { get; set; } = string.Empty;
        public string ResumeUrl { get; set; } = string.Empty;
    }
}
