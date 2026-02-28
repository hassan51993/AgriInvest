using AgriInvest.Domain.Common;
using AgriInvest.Domain.Enums;
using AgriInvest.Domain.ValueObjects;

namespace AgriInvest.Domain.Entities;

public class Investment : AuditableEntity
{
    public int ProjectId { get; set; }
    public int InvestorId { get; set; }
    public Money Amount { get; set; } = default!;
    public InvestmentStatus Status { get; set; }
    public DateTime InvestmentDate { get; set; }
    public string? Notes { get; set; }

    public Project Project { get; set; } = default!;
    public Investor Investor { get; set; } = default!;
}
