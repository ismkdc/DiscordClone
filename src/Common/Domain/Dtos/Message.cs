namespace Common.Domain.Dtos;

public record Message(Guid Id, User User, string Content, DateTime CreatedAt);