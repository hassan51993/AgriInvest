using AgriInvest.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgriInvest.Infrastructure.Persistence.Configurations;

public class TeamMemberConfiguration : IEntityTypeConfiguration<TeamMember>
{
    public void Configure(EntityTypeBuilder<TeamMember> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.NameAr).IsRequired().HasMaxLength(200);
        builder.Property(t => t.NameEn).IsRequired().HasMaxLength(200);
        builder.Property(t => t.PositionAr).IsRequired().HasMaxLength(200);
        builder.Property(t => t.PositionEn).IsRequired().HasMaxLength(200);
        builder.Property(t => t.BioAr).HasMaxLength(2000);
        builder.Property(t => t.BioEn).HasMaxLength(2000);
        builder.Property(t => t.PhotoUrl).HasMaxLength(1000);
        builder.Property(t => t.LinkedInUrl).HasMaxLength(500);

        builder.HasIndex(t => t.SortOrder);
    }
}
