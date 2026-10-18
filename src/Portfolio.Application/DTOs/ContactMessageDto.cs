using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.DTOs
{
    public class ContactMessageDto
    {
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
