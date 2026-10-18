using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.Services
{
    public class ContactService : IContactService
    {
        private readonly IRepository<ContactMessage> _contactRepository;

        public ContactService(IRepository<ContactMessage> contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task SubmitMessageAsync(ContactMessageDto dto, CancellationToken cancellationToken = default)
        {
            var message = new ContactMessage
            {
                SenderName = dto.SenderName,
                SenderEmail = dto.SenderEmail,
                Subject = dto.Subject,
                Message = dto.Message,
                IsRead = false
            };

            await _contactRepository.AddAsync(message, cancellationToken);
        }
    }
}
