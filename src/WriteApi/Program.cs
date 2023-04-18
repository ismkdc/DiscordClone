using Centrifugo.AspNetCore.Configuration;
using Centrifugo.AspNetCore.Extensions;
using Common.Infrastructure.Extensions;
using Common.Infrastructure.Middlewares;
using WriteApi.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.ConfigureJwtSettings();
builder.ConfigureApiSettings();

builder.Services.AddCentrifugoClient(new CentrifugoOptions
{
    Url = builder.Configuration.GetConnectionString("CentrifugoUrl"),
    ApiKey = builder.Configuration.GetConnectionString("CentrifugoApiKey")
});

builder.Services.AddRedis(builder.Configuration.GetConnectionString("Redis"));

builder.Services.AddJwtProvider();

builder.Services.AddApiServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<AuthenticationMiddleware>();

app.MapControllers();

app.Run();