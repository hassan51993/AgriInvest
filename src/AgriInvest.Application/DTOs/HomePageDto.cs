namespace AgriInvest.Application.DTOs;

public class HomePageDto
{
    public List<PageContentDto> HeroContent { get; set; } = new();
    public List<ProjectSummaryDto> FeaturedProjects { get; set; } = new();
    public List<SuccessStorySummaryDto> FeaturedSuccessStories { get; set; } = new();
}
