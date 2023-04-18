using Common.Domain.Dtos;
using Microsoft.AspNetCore.Mvc;
using ReadApi.Infrastructure.Services;

namespace ReadApi.Application.Controllers;

[Route("/read-api/messages")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly MessageService _messageService;

    public MessageController(MessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpGet("list")]
    public IAsyncEnumerable<Message> List()
    {
        return _messageService.List();
    }
}