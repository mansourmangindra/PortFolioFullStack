using Portfolio.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Domain.Entities
{
    public class ContactMessage : BaseEntity
    {
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
    }
}
