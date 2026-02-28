namespace AgriInvest.Application.DTOs;

public class SuccessStoryDto
{
    public int Id { get; set; }
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string ContentAr { get; set; } = string.Empty;
    public string ContentEn { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? BeforeImageUrl { get; set; }
    public string? AfterImageUrl { get; set; }
    public string? TestimonialAr { get; set; }
    public string? TestimonialEn { get; set; }
    public string? TestimonialAuthor { get; set; }
    public decimal? ROIAchieved { get; set; }
    public decimal? AreaTransformed { get; set; }
    public string? FeaturedImageUrl { get; set; }
    public DateTime PublishDate { get; set; }
    public bool IsFeatured { get; set; }
    public int? ProjectId { get; set; }
    public bool IsActive { get; set; }
}
