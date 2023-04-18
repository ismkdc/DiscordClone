using Microsoft.AspNetCore.Mvc;
using WriteApi.Domain.Dtos;
using WriteApi.Infrastructure.Services;

namespace WriteApi.Application.Controllers;

[Route("/write-api/messages")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly MessageService _messageService;

    public MessageController(MessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] MessageRequest message)
    {
        await _messageService.Create(message);
        return Ok();
    }
}