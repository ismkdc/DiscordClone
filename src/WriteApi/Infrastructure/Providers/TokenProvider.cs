using Common.Infrastructure.Abstraction.Authentication;

namespace WriteApi.Infrastructure.Providers;

public class TokenProvider<T> : ITokenProvider<T>
{
    private readonly IJwtProvider _jwtProvider;

    public TokenProvider(IJwtProvider jwtProvider)
    {
        _jwtProvider = jwtProvider;
    }

    public T Validated { get; private set; }

    public bool Validate(string token)
    {
        Validated = _jwtProvider.Decode<T>(token);
        return Validated != null;
    }
}