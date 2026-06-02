using ClaimsDashboard.Api.Data;
using ClaimsDashboard.Api.Models;
using ClaimsDashboard.Api.Services;

namespace ClaimsDashboard.Api.Tests;

public class DashboardServiceTests
{
    private readonly MockDataStore _store;
    private readonly DashboardService _service;

    public DashboardServiceTests()
    {
        // The store seeds itself deterministically (fixed RNG seed), so these
        // tests run against the same dataset the API serves.
        _store = new MockDataStore();
        _service = new DashboardService(_store);
    }

    [Fact]
    public void GetOverview_CountsMatchUnderlyingData()
    {
        var overview = _service.GetOverview();

        Assert.Equal(_store.Policies.Count, overview.TotalPolicies);
        Assert.Equal(_store.Policies.Count(p => p.Status == PolicyStatus.Active), overview.ActivePolicies);
        Assert.Equal(_store.Policies.Sum(p => p.CoverageAmount), overview.TotalCoverage);
    }

    [Fact]
    public void GetOverview_TotalClaimsPaid_OnlyCountsCompletedPayouts()
    {
        var expected = _store.Transactions
            .Where(t => t.Type == TransactionType.ClaimPayout && t.Status == TransactionStatus.Completed)
            .Sum(t => t.Amount);

        Assert.Equal(expected, _service.GetOverview().TotalClaimsPaid);
    }

    [Fact]
    public void GetCategoryAnalysis_PolicyCountsSumToTotal_AndAreSorted()
    {
        var analysis = _service.GetCategoryAnalysis();

        Assert.Equal(_store.Policies.Count, analysis.Sum(a => a.PolicyCount));
        Assert.Equal(
            analysis.Select(a => a.Category).OrderBy(c => c),
            analysis.Select(a => a.Category));
    }

    [Fact]
    public void GetCategoryAnalysis_PremiumPerCategoryMatchesData()
    {
        var analysis = _service.GetCategoryAnalysis();

        foreach (var row in analysis)
        {
            var category = Enum.Parse<PolicyCategory>(row.Category);
            var expectedPremium = _store.Policies
                .Where(p => p.Category == category)
                .Sum(p => p.PremiumAmount);
            Assert.Equal(expectedPremium, row.TotalPremium);
        }
    }

    [Fact]
    public void GetBudgetVsActual_HasRowPerCategory_AndVarianceIsBudgetedMinusActual()
    {
        var rows = _service.GetBudgetVsActual();

        Assert.Equal(Enum.GetValues<PolicyCategory>().Length, rows.Count);
        Assert.All(rows, r => Assert.Equal(r.Budgeted - r.Actual, r.Variance));
    }

    [Fact]
    public void GetBudgetVsActual_BudgetedMatchesReservedTotals()
    {
        var rows = _service.GetBudgetVsActual();

        foreach (var row in rows)
        {
            var category = Enum.Parse<PolicyCategory>(row.Category);
            var expectedReserved = _store.Policies
                .Where(p => p.Category == category)
                .Sum(p => p.ReservedClaimAmount);
            Assert.Equal(expectedReserved, row.Budgeted);
        }
    }

    [Theory]
    [InlineData(5)]
    [InlineData(10)]
    [InlineData(25)]
    public void GetRecentTransactions_RespectsLimit_AndIsSortedDescendingByDate(int limit)
    {
        var transactions = _service.GetRecentTransactions(limit);

        Assert.Equal(Math.Min(limit, _store.Transactions.Count), transactions.Count);

        var dates = transactions.Select(t => t.Date).ToList();
        Assert.Equal(dates.OrderByDescending(d => d), dates);
    }
}
