using AgriInvest.Domain.Common;

namespace AgriInvest.Domain.Entities;

public class ProjectImage : BaseEntity
{
    public int ProjectId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? Caption { get; set; }
    public int SortOrder { get; set; }

    public Project Project { get; set; } = default!;
}
