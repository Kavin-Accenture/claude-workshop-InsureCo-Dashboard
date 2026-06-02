namespace ClaimsDashboard.Api.Dtos;

/// <summary>Per-category roll-up powering the "analysis by category" bar chart.</summary>
public record CategoryAnalysisDto
{
    public string Category { get; init; } = string.Empty;
    public int PolicyCount { get; init; }
    public decimal TotalClaimAmount { get; init; }
    public decimal TotalPremium { get; init; }
}
