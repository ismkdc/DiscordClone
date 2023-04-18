using System.Text;
using Common.Infrastructure.Abstraction.Authentication;
using Jose;
using Microsoft.Extensions.Options;
using JwtSettings = Common.Domain.Settings.JwtSettings;

namespace Common.Infrastructure.Services;

public class JwtProvider : IJwtProvider
{
    private readonly byte[] _secret;

    public JwtProvider(IOptions<JwtSettings> settings)
    {
        _secret = Encoding.UTF8.GetBytes(settings.Value.Secret);
    }

    public string Encode(object payload)
    {
        return JWT.Encode(payload, _secret, JwsAlgorithm.HS256);
    }

    public T Decode<T>(string token)
    {
        return JWT.Decode<T>(token, _secret, JwsAlgorithm.HS256);
    }
}