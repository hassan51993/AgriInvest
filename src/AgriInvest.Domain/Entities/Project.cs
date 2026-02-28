using AgriInvest.Domain.Common;
using AgriInvest.Domain.Enums;
using AgriInvest.Domain.ValueObjects;

namespace AgriInvest.Domain.Entities;

public class Project : AuditableEntity, IAggregateRoot
{
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public ProjectType Type { get; set; }
    public ProjectStatus Status { get; set; }
    public decimal AreaInHectares { get; set; }
    public GeoLocation Location { get; set; } = default!;
    public Money TargetInvestment { get; set; } = default!;
    public Money CurrentInvestment { get; set; } = default!;
    public decimal ExpectedROI { get; set; }
    public DateRange Duration { get; set; } = default!;
    public string? FeaturedImageUrl { get; set; }
    public int SortOrder { get; set; }

    public ICollection<ProjectImage> Images { get; set; } = new List<ProjectImage>();
    public ICollection<Investment> Investments { get; set; } = new List<Investment>();
    public ICollection<SuccessStory> SuccessStories { get; set; } = new List<SuccessStory>();
}
