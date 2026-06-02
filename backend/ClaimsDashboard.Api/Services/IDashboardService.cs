using ClaimsDashboard.Api.Dtos;

namespace ClaimsDashboard.Api.Services;

public interface IDashboardService
{
    OverviewDto GetOverview();
    IReadOnlyList<CategoryAnalysisDto> GetCategoryAnalysis();
    IReadOnlyList<BudgetVsActualDto> GetBudgetVsActual();
    IReadOnlyList<TransactionDto> GetRecentTransactions(int limit);
}
