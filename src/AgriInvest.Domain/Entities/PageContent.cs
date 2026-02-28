using AgriInvest.Domain.Common;

namespace AgriInvest.Domain.Entities;

public class PageContent : AuditableEntity
{
    public string PageKey { get; set; } = string.Empty;
    public string SectionKey { get; set; } = string.Empty;
    public string ContentAr { get; set; } = string.Empty;
    public string ContentEn { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? MetadataJson { get; set; }
    public int SortOrder { get; set; }
}
