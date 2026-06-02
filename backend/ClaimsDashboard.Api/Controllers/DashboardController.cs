using ClaimsDashboard.Api.Dtos;
using ClaimsDashboard.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClaimsDashboard.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _service;

    public DashboardController(IDashboardService service) => _service = service;

    /// <summary>Top-level KPIs for the policy overview cards.</summary>
    [HttpGet("overview")]
    public ActionResult<OverviewDto> GetOverview() => Ok(_service.GetOverview());

    /// <summary>Per-category roll-up for the bar chart.</summary>
    [HttpGet("category-analysis")]
    public ActionResult<IReadOnlyList<CategoryAnalysisDto>> GetCategoryAnalysis()
        => Ok(_service.GetCategoryAnalysis());

    /// <summary>Reserved vs paid claim amounts per category.</summary>
    [HttpGet("budget-vs-actual")]
    public ActionResult<IReadOnlyList<BudgetVsActualDto>> GetBudgetVsActual()
        => Ok(_service.GetBudgetVsActual());
}
