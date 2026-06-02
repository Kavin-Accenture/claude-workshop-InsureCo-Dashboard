namespace ClaimsDashboard.Api.Models;

/// <summary>
/// An insurance policy held by a customer. Drives the overview KPIs and category analysis.
/// </summary>
public class Policy
{
    public Guid Id { get; set; }
    public string PolicyNumber { get; set; } = string.Empty;
    public string HolderName { get; set; } = string.Empty;
    public PolicyCategory Category { get; set; }
    public PolicyStatus Status { get; set; }

    /// <summary>Annual premium charged for the policy.</summary>
    public decimal PremiumAmount { get; set; }

    /// <summary>Total coverage / sum insured.</summary>
    public decimal CoverageAmount { get; set; }

    /// <summary>Budgeted reserve set aside for expected claims on this policy.</summary>
    public decimal ReservedClaimAmount { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}
