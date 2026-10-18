using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTOs;
using Portfolio.Application.Interfaces;

namespace Portfolio.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitMessage([FromBody] ContactMessageDto dto, CancellationToken cancellationToken)
        {
            await _contactService.SubmitMessageAsync(dto, cancellationToken);
            return Ok(new { message = "Contact message sent successfully." });
        }

    }
}
