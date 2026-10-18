using FluentValidation;
using Portfolio.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Portfolio.Application.Validators
{
    public class ContactMessageValidator : AbstractValidator<ContactMessageDto>
    {
        public ContactMessageValidator()
        {
            RuleFor(x => x.SenderName)
                .NotEmpty().WithMessage("Sender name is required.")
                .MaximumLength(100).WithMessage("Sender name cannot exceed 100 characters.");

            RuleFor(x => x.SenderEmail)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email address is required.");

            RuleFor(x => x.Subject)
                .NotEmpty().WithMessage("Subject is required.")
                .MaximumLength(200).WithMessage("Subject cannot exceed 200 characters.");

            RuleFor(x => x.Message)
                .NotEmpty().WithMessage("Message content is required.")
                .MaximumLength(2000).WithMessage("Message cannot exceed 2000 characters.");
        }
    }
}
