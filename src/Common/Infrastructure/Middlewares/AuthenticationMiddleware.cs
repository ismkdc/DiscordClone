using Common.Domain.Dtos;
using Common.Infrastructure.Abstraction.Authentication;
using Microsoft.AspNetCore.Http;

namespace Common.Infrastructure.Middlewares;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    // private readonly IEnumerable<string> _skipAuthenticationPaths;
    //
    // public AuthenticationMiddleware(RequestDelegate next, IEnumerable<string> skipAuthenticationPaths)
    // {
    //     _next = next;
    //     _skipAuthenticationPaths = skipAuthenticationPaths;
    // }

    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, ITokenProvider<User> tokenProvider)
    {
        var currentPath = context.Request.Path.ToString();

        //ToDo: Add skip authentication paths
        if (currentPath == "/write-api/sessions/create")
        {
            await _next(context);
            return;
        }

        var authHeader = context.Request.Headers["Authentication"].FirstOrDefault();

        try
        {
            if (authHeader != null && tokenProvider.Validate(authHeader))
            {
                await _next(context);
                return;
            }
        }
        catch
        {
            // ignored
        }

        context.Response.StatusCode = 401;
    }
}