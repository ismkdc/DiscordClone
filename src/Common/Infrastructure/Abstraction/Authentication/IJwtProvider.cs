namespace Common.Infrastructure.Abstraction.Authentication;

public interface IJwtProvider
{
    string Encode(object payload);
    T Decode<T>(string token);
}