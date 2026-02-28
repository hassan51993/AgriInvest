using AgriInvest.Domain.Enums;

namespace AgriInvest.Application.DTOs;

public class ContactInquiryDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public InquiryStatus Status { get; set; }
    public DateTime SubmittedAt { get; set; }
    public DateTime? RespondedAt { get; set; }
}
