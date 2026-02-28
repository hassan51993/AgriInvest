using AgriInvest.Domain.Common;
using AgriInvest.Domain.Enums;

namespace AgriInvest.Domain.Entities;

public class MediaItem : AuditableEntity
{
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public string? DescriptionEn { get; set; }
    public MediaType Type { get; set; }
    public string Url { get; set; } = string.Empty;
    public string? ThumbnailUrl { get; set; }
    public string? ExternalLink { get; set; }
    public DateTime PublishDate { get; set; }
    public bool IsFeatured { get; set; }
    public string? Tags { get; set; }
}
