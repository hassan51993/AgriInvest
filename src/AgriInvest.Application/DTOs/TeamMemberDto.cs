namespace AgriInvest.Application.DTOs;

public class TeamMemberDto
{
    public int Id { get; set; }
    public string NameAr { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string PositionAr { get; set; } = string.Empty;
    public string PositionEn { get; set; } = string.Empty;
    public string? BioAr { get; set; }
    public string? BioEn { get; set; }
    public string? PhotoUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
}
