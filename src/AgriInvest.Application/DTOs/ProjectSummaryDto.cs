using AgriInvest.Domain.Enums;

namespace AgriInvest.Application.DTOs;

public class ProjectSummaryDto
{
    public int Id { get; set; }
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public ProjectType Type { get; set; }
    public ProjectStatus Status { get; set; }
    public decimal AreaInHectares { get; set; }
    public decimal TargetInvestmentAmount { get; set; }
    public decimal CurrentInvestmentAmount { get; set; }
    public decimal ExpectedROI { get; set; }
    public string? FeaturedImageUrl { get; set; }
    public string? LocationAddressEn { get; set; }
    public string? LocationAddressAr { get; set; }
}
