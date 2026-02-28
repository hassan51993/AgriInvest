using AgriInvest.Domain.Common;
using AgriInvest.Domain.Enums;

namespace AgriInvest.Domain.Entities;

public class ContactInquiry : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public InquiryStatus Status { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RespondedAt { get; set; }
}
