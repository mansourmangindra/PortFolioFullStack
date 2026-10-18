using Portfolio.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.Interfaces
{
    public interface IContactService
    {
        Task SubmitMessageAsync(ContactMessageDto dto, CancellationToken cancellationToken = default);
    }
}
