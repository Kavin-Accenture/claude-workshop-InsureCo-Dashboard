using ClaimsDashboard.Api.Data;
using ClaimsDashboard.Api.Dtos;
using ClaimsDashboard.Api.Models;

namespace ClaimsDashboard.Api.Services;

/// <summary>
/// Computes dashboard aggregates from the in-memory <see cref="MockDataStore"/> using LINQ.
/// </summary>
public class DashboardService : IDashboardService
{
    private readonly MockDataStore _store;

    public DashboardService(MockDataStore store) => _store = store;

    public OverviewDto GetOverview()
    {
        var policies = _store.Policies;
        var transactions = _store.Transactions;

        return new OverviewDto
        {
            TotalPolicies = policies.Count,
            ActivePolicies = policies.Count(p => p.Status == PolicyStatus.Active),
            TotalCoverage = policies.Sum(p => p.CoverageAmount),
            TotalClaimsPaid = transactions
                .Where(t => t.Type == TransactionType.ClaimPayout && t.Status == TransactionStatus.Completed)
                .Sum(t => t.Amount),
            PendingClaims = transactions
                .Count(t => t.Type == TransactionType.ClaimPayout && t.Status == TransactionStatus.Pending),
            TotalPremiumCollected = transactions
                .Where(t => t.Type == TransactionType.PremiumPayment && t.Status == TransactionStatus.Completed)
                .Sum(t => t.Amount)
        };
    }

    public IReadOnlyList<CategoryAnalysisDto> GetCategoryAnalysis()
    {
        // Claim totals per category, computed once and looked up while projecting policies.
        var claimsByCategory = _store.Transactions
            .Where(t => t.Type == TransactionType.ClaimPayout && t.Status == TransactionStatus.Completed)
            .GroupBy(t => t.Category)
            .ToDictionary(g => g.Key, g => g.Sum(t => t.Amount));

        return _store.Policies
            .GroupBy(p => p.Category)
            .OrderBy(g => g.Key.ToString())
            .Select(g => new CategoryAnalysisDto
            {
                Category = g.Key.ToString(),
                PolicyCount = g.Count(),
                TotalPremium = g.Sum(p => p.PremiumAmount),
                TotalClaimAmount = claimsByCategory.GetValueOrDefault(g.Key, 0m)
            })
            .ToList();
    }

    public IReadOnlyList<BudgetVsActualDto> GetBudgetVsActual()
    {
        var reservedByCategory = _store.Policies
            .GroupBy(p => p.Category)
            .ToDictionary(g => g.Key, g => g.Sum(p => p.ReservedClaimAmount));

        var paidByCategory = _store.Transactions
            .Where(t => t.Type == TransactionType.ClaimPayout && t.Status == TransactionStatus.Completed)
            .GroupBy(t => t.Category)
            .ToDictionary(g => g.Key, g => g.Sum(t => t.Amount));

        return Enum.GetValues<PolicyCategory>()
            .Select(category =>
            {
                var budgeted = reservedByCategory.GetValueOrDefault(category, 0m);
                var actual = paidByCategory.GetValueOrDefault(category, 0m);
                return new BudgetVsActualDto
                {
                    Category = category.ToString(),
                    Budgeted = budgeted,
                    Actual = actual,
                    Variance = budgeted - actual
                };
            })
            .ToList();
    }

    public IReadOnlyList<TransactionDto> GetRecentTransactions(int limit)
    {
        // Store keeps transactions sorted by date descending.
        return _store.Transactions
            .Take(limit)
            .Select(t => new TransactionDto
            {
                TransactionNumber = t.TransactionNumber,
                PolicyNumber = t.PolicyNumber,
                Category = t.Category.ToString(),
                Type = t.Type.ToString(),
                Status = t.Status.ToString(),
                Amount = t.Amount,
                Date = t.Date
            })
            .ToList();
    }
}
