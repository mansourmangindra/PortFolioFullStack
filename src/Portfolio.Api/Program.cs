using Portfolio.Api.Middlewares;
using Portfolio.Application.Extensions;
using Portfolio.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        //policy.WithOrigins("http://localhost:4200")
        //      .AllowAnyHeader()
        //      .AllowAnyMethod();
        policy.WithOrigins(
                "http://localhost:4200",
                "https://lively-mud-0589c790f.4.azurestaticapps.net" // <-- Add your live Azure frontend URL here
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowAngularClient");

app.UseAuthorization();

app.MapControllers();

app.Run();