using AgriInvest.Domain.Enums;

namespace AgriInvest.Application.DTOs;

public class MediaItemDto
{
    public int Id { get; set; }
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
    public bool IsActive { get; set; }
}
