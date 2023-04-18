using Common.Domain.Dtos;
using Microsoft.AspNetCore.Mvc;
using ReadApi.Infrastructure.Services;

namespace ReadApi.Application.Controllers;

[Route("/read-api/sessions")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly SessionService _sessionService;

    public SessionController(SessionService sessionService)
    {
        _sessionService = sessionService;
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        return Ok(await _sessionService.Me());
    }

    [HttpGet("list")]
    public IAsyncEnumerable<User> List()
    {
        return _sessionService.List();
    }
}