using NameGenerator.Generators;

namespace Common.Domain.Dtos;

public record User(Guid Id, string Name, string ProfileImageUrl)
{
    public bool IsOnline { get; set; } = true;

    private static readonly RealNameGenerator NameGenerator = new();

    public static User Generate()
    {
        return new User(Guid.NewGuid(), NameGenerator.Generate(),
            $"https://api.dicebear.com/6.x/pixel-art/svg?seed={Guid.NewGuid()}");
    }
}