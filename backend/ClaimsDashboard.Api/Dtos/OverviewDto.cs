namespace ClaimsDashboard.Api.Dtos;

/// <summary>Top-level KPIs for the policy overview cards.</summary>
public record OverviewDto
{
    public int TotalPolicies { get; init; }
    public int ActivePolicies { get; init; }
    public decimal TotalCoverage { get; init; }
    public decimal TotalClaimsPaid { get; init; }
    public int PendingClaims { get; init; }
    public decimal TotalPremiumCollected { get; init; }
}
