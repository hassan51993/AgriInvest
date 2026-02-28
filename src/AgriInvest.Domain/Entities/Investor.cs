using AgriInvest.Domain.Common;

namespace AgriInvest.Domain.Entities;

public class Investor : AuditableEntity
{
    public string FullNameAr { get; set; } = string.Empty;
    public string FullNameEn { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string? Nationality { get; set; }

    public ICollection<Investment> Investments { get; set; } = new List<Investment>();
}
