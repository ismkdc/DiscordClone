using Microsoft.AspNetCore.Mvc;
using WriteApi.Infrastructure.Services;

namespace WriteApi.Application.Controllers;

[Route("/write-api/sessions")]
[ApiController]
public class SessionController : ControllerBase
{
    private readonly SessionService _sessionService;

    public SessionController(SessionService sessionService)
    {
        _sessionService = sessionService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create()
    {
        return Ok(await _sessionService.Create());
    }

    [HttpDelete("kill")]
    public async Task<IActionResult> Kill()
    {
        return Ok(await _sessionService.Kill());
    }
}