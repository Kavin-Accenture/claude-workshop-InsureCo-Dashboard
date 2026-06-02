using ClaimsDashboard.Api.Models;

namespace ClaimsDashboard.Api.Data;

/// <summary>
/// In-memory data source. Seeds a deterministic set of policies and transactions
/// (fixed RNG seed) so the dashboard shows stable numbers across restarts.
/// Registered as a singleton so the seeded data lives for the app's lifetime.
/// </summary>
public class MockDataStore
{
    public IReadOnlyList<Policy> Policies { get; }
    public IReadOnlyList<Transaction> Transactions { get; }

    private static readonly string[] FirstNames =
        { "James", "Maria", "David", "Sophia", "Liam", "Olivia", "Noah", "Emma", "Ava", "Ethan", "Mia", "Lucas" };
    private static readonly string[] LastNames =
        { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Patel", "Nguyen", "Khan", "Lee" };

    public MockDataStore()
    {
        var rng = new Random(20260601); // fixed seed -> deterministic dataset
        var policies = new List<Policy>();
        var transactions = new List<Transaction>();

        var categories = Enum.GetValues<PolicyCategory>();
        var today = new DateTime(2026, 6, 1);

        for (var i = 1; i <= 60; i++)
        {
            var category = categories[rng.Next(categories.Length)];
            var status = WeightedStatus(rng);
            var premium = Math.Round((decimal)(rng.NextDouble() * 4500 + 500), 2);
            var coverage = Math.Round(premium * (decimal)(rng.NextDouble() * 30 + 20), 2);
            var reserved = Math.Round(coverage * (decimal)(rng.NextDouble() * 0.12 + 0.03), 2);
            var start = today.AddDays(-rng.Next(30, 720));

            var policy = new Policy
            {
                Id = Guid.NewGuid(),
                PolicyNumber = $"POL-2026-{i:D5}",
                HolderName = $"{FirstNames[rng.Next(FirstNames.Length)]} {LastNames[rng.Next(LastNames.Length)]}",
                Category = category,
                Status = status,
                PremiumAmount = premium,
                CoverageAmount = coverage,
                ReservedClaimAmount = reserved,
                StartDate = start,
                EndDate = start.AddYears(1)
            };
            policies.Add(policy);

            // 1-4 transactions per policy
            var txCount = rng.Next(1, 5);
            for (var t = 0; t < txCount; t++)
            {
                var type = WeightedTransactionType(rng);
                var amount = type switch
                {
                    TransactionType.PremiumPayment => Math.Round(premium / 12m, 2),
                    TransactionType.ClaimPayout => Math.Round(reserved * (decimal)(rng.NextDouble() * 1.4 + 0.1), 2),
                    TransactionType.Refund => Math.Round(premium * (decimal)(rng.NextDouble() * 0.15), 2),
                    _ => Math.Round((decimal)(rng.NextDouble() * 400 - 200), 2)
                };

                transactions.Add(new Transaction
                {
                    Id = Guid.NewGuid(),
                    TransactionNumber = $"TXN-{transactions.Count + 1:D6}",
                    PolicyId = policy.Id,
                    PolicyNumber = policy.PolicyNumber,
                    Category = policy.Category,
                    Type = type,
                    Status = WeightedTransactionStatus(rng),
                    Amount = amount,
                    Date = today.AddDays(-rng.Next(0, 90)).AddHours(-rng.Next(0, 24))
                });
            }
        }

        Policies = policies;
        Transactions = transactions
            .OrderByDescending(t => t.Date)
            .ToList();
    }

    private static PolicyStatus WeightedStatus(Random rng)
    {
        var roll = rng.NextDouble();
        return roll switch
        {
            < 0.70 => PolicyStatus.Active,
            < 0.85 => PolicyStatus.Pending,
            < 0.95 => PolicyStatus.Expired,
            _ => PolicyStatus.Cancelled
        };
    }

    private static TransactionType WeightedTransactionType(Random rng)
    {
        var roll = rng.NextDouble();
        return roll switch
        {
            < 0.55 => TransactionType.PremiumPayment,
            < 0.85 => TransactionType.ClaimPayout,
            < 0.95 => TransactionType.Refund,
            _ => TransactionType.Adjustment
        };
    }

    private static TransactionStatus WeightedTransactionStatus(Random rng)
    {
        var roll = rng.NextDouble();
        return roll switch
        {
            < 0.80 => TransactionStatus.Completed,
            < 0.93 => TransactionStatus.Pending,
            _ => TransactionStatus.Failed
        };
    }
}
