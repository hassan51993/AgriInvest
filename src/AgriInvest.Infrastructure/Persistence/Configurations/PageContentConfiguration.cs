using AgriInvest.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgriInvest.Infrastructure.Persistence.Configurations;

public class PageContentConfiguration : IEntityTypeConfiguration<PageContent>
{
    public void Configure(EntityTypeBuilder<PageContent> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.PageKey).IsRequired().HasMaxLength(100);
        builder.Property(p => p.SectionKey).IsRequired().HasMaxLength(100);
        builder.Property(p => p.ContentAr).IsRequired().HasMaxLength(5000);
        builder.Property(p => p.ContentEn).IsRequired().HasMaxLength(5000);
        builder.Property(p => p.ImageUrl).HasMaxLength(1000);
        builder.Property(p => p.MetadataJson).HasMaxLength(4000);

        builder.HasIndex(p => new { p.PageKey, p.SectionKey });
    }
}
