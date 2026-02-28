using AgriInvest.Domain.Enums;

namespace AgriInvest.Application.DTOs;

public class ProjectDto
{
    public int Id { get; set; }
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public ProjectType Type { get; set; }
    public ProjectStatus Status { get; set; }
    public decimal AreaInHectares { get; set; }

    // GeoLocation flattened
    public double LocationLatitude { get; set; }
    public double LocationLongitude { get; set; }
    public string? LocationAddressAr { get; set; }
    public string? LocationAddressEn { get; set; }

    // Money (TargetInvestment) flattened
    public decimal TargetInvestmentAmount { get; set; }
    public string TargetInvestmentCurrency { get; set; } = string.Empty;

    // Money (CurrentInvestment) flattened
    public decimal CurrentInvestmentAmount { get; set; }
    public string CurrentInvestmentCurrency { get; set; } = string.Empty;

    public decimal ExpectedROI { get; set; }

    // DateRange flattened
    public DateTime DurationStartDate { get; set; }
    public DateTime DurationEndDate { get; set; }

    public string? FeaturedImageUrl { get; set; }
    public int SortOrder { get; set; }

    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}
