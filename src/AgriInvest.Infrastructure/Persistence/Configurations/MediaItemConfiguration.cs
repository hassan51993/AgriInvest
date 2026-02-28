using AgriInvest.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgriInvest.Infrastructure.Persistence.Configurations;

public class MediaItemConfiguration : IEntityTypeConfiguration<MediaItem>
{
    public void Configure(EntityTypeBuilder<MediaItem> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.TitleAr).IsRequired().HasMaxLength(500);
        builder.Property(m => m.TitleEn).IsRequired().HasMaxLength(500);
        builder.Property(m => m.DescriptionAr).HasMaxLength(2000);
        builder.Property(m => m.DescriptionEn).HasMaxLength(2000);
        builder.Property(m => m.Url).IsRequired().HasMaxLength(1000);
        builder.Property(m => m.ThumbnailUrl).HasMaxLength(1000);
        builder.Property(m => m.ExternalLink).HasMaxLength(1000);
        builder.Property(m => m.Tags).HasMaxLength(1000);

        builder.HasIndex(m => m.PublishDate);
    }
}
