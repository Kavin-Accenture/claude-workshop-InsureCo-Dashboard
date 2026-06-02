namespace ClaimsDashboard.Api.Dtos;

/// <summary>Flattened transaction shape for the recent transactions table.</summary>
public record TransactionDto
{
    public string TransactionNumber { get; init; } = string.Empty;
    public string PolicyNumber { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty;
    public string Type { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public decimal Amount { get; init; }
    public DateTime Date { get; init; }
}
