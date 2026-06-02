using ClaimsDashboard.Api.Data;

namespace ClaimsDashboard.Api.Tests;

public class MockDataStoreTests
{
    [Fact]
    public void Seed_ProducesPoliciesAndTransactions()
    {
        var store = new MockDataStore();

        Assert.NotEmpty(store.Policies);
        Assert.NotEmpty(store.Transactions);
    }

    [Fact]
    public void Seed_IsDeterministic_AcrossInstances()
    {
        var a = new MockDataStore();
        var b = new MockDataStore();

        Assert.Equal(a.Policies.Count, b.Policies.Count);
        Assert.Equal(a.Transactions.Count, b.Transactions.Count);
        Assert.Equal(
            a.Policies.Select(p => p.PolicyNumber),
            b.Policies.Select(p => p.PolicyNumber));
    }

    [Fact]
    public void Transactions_AreSortedNewestFirst()
    {
        var store = new MockDataStore();
        var dates = store.Transactions.Select(t => t.Date).ToList();

        Assert.Equal(dates.OrderByDescending(d => d), dates);
    }

    [Fact]
    public void EveryTransaction_ReferencesAnExistingPolicy()
    {
        var store = new MockDataStore();
        var policyIds = store.Policies.Select(p => p.Id).ToHashSet();

        Assert.All(store.Transactions, t => Assert.Contains(t.PolicyId, policyIds));
    }
}
