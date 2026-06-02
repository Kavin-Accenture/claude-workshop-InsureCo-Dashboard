using ClaimsDashboard.Api.Dtos;
using ClaimsDashboard.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClaimsDashboard.Api.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionsController : ControllerBase
{
    private readonly IDashboardService _service;

    public TransactionsController(IDashboardService service) => _service = service;

    /// <summary>Most recent transactions for the dashboard table.</summary>
    [HttpGet("recent")]
    public ActionResult<IReadOnlyList<TransactionDto>> GetRecent([FromQuery] int limit = 10)
    {
        limit = Math.Clamp(limit, 1, 100);
        return Ok(_service.GetRecentTransactions(limit));
    }
}
