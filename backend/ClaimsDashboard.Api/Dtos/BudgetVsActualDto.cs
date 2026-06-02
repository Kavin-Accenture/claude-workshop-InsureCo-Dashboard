namespace ClaimsDashboard.Api.Dtos;

/// <summary>
/// Reserved (budgeted) claim amount vs actual amount paid out, per category.
/// Positive variance means we paid less than reserved (favourable).
/// </summary>
public record BudgetVsActualDto
{
    public string Category { get; init; } = string.Empty;
    public decimal Budgeted { get; init; }
    public decimal Actual { get; init; }
    public decimal Variance { get; init; }
}
