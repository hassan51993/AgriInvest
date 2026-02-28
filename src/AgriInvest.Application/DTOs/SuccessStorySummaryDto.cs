namespace AgriInvest.Application.DTOs;

public class SuccessStorySummaryDto
{
    public int Id { get; set; }
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? FeaturedImageUrl { get; set; }
    public string? TestimonialAuthor { get; set; }
    public decimal? ROIAchieved { get; set; }
    public DateTime PublishDate { get; set; }
    public bool IsFeatured { get; set; }
}
