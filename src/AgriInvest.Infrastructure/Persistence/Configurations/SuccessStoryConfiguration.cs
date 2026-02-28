using AgriInvest.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgriInvest.Infrastructure.Persistence.Configurations;

public class SuccessStoryConfiguration : IEntityTypeConfiguration<SuccessStory>
{
    public void Configure(EntityTypeBuilder<SuccessStory> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.TitleAr).IsRequired().HasMaxLength(500);
        builder.Property(s => s.TitleEn).IsRequired().HasMaxLength(500);
        builder.Property(s => s.ContentAr).IsRequired().HasMaxLength(5000);
        builder.Property(s => s.ContentEn).IsRequired().HasMaxLength(5000);
        builder.Property(s => s.Slug).IsRequired().HasMaxLength(500);
        builder.Property(s => s.ROIAchieved).HasColumnType("decimal(5,2)");
        builder.Property(s => s.AreaTransformed).HasColumnType("decimal(18,2)");

        builder.HasIndex(s => s.Slug).IsUnique();

        builder.HasOne(s => s.Project)
            .WithMany(p => p.SuccessStories)
            .HasForeignKey(s => s.ProjectId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
