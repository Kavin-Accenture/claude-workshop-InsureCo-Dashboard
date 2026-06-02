namespace ClaimsDashboard.Api.Models;

/// <summary>
/// A financial movement against a policy (premium in, claim paid out, refund, adjustment).
/// </summary>
public class Transaction
{
    public Guid Id { get; set; }
    public string TransactionNumber { get; set; } = string.Empty;

    public Guid PolicyId { get; set; }

    /// <summary>Denormalized policy number for direct display in the transactions table.</summary>
    public string PolicyNumber { get; set; } = string.Empty;

    /// <summary>Denormalized category so aggregations don't need to join back to the policy.</summary>
    public PolicyCategory Category { get; set; }

    public TransactionType Type { get; set; }
    public TransactionStatus Status { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
}
