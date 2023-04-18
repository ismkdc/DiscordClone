using Common.Domain.Dtos;

namespace WriteApi.Domain.Dtos;

public record SessionResponse(User User, string Token);