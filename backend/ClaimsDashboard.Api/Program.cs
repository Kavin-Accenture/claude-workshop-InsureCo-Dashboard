using ClaimsDashboard.Api.Data;
using ClaimsDashboard.Api.Services;

var builder = WebApplication.CreateBuilder(args);

const string FrontendCorsPolicy = "FrontendCorsPolicy";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// In-memory data + aggregation service. MockDataStore is a singleton so the
// seeded dataset is stable for the app's lifetime.
builder.Services.AddSingleton<MockDataStore>();
builder.Services.AddSingleton<IDashboardService, DashboardService>();

// Allow the Vite dev server to call the API during development.
builder.Services.AddCors(options =>
{
    options.AddPolicy(FrontendCorsPolicy, policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:4173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(FrontendCorsPolicy);
app.MapControllers();

app.Run();
