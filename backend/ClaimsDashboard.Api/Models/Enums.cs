using System.Text.Json.Serialization;

namespace ClaimsDashboard.Api.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PolicyCategory
{
    Auto,
    Home,
    Life,
    Health,
    Commercial
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PolicyStatus
{
    Active,
    Pending,
    Expired,
    Cancelled
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TransactionType
{
    PremiumPayment,
    ClaimPayout,
    Refund,
    Adjustment
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TransactionStatus
{
    Completed,
    Pending,
    Failed
}
