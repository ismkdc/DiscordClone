namespace Common.Infrastructure.Abstraction.Authentication;

public interface ITokenProvider<out T>
{
    public T Validated { get; }
    bool Validate(string token);
}