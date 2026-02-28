using AgriInvest.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgriInvest.Infrastructure.Persistence.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.TitleAr).IsRequired().HasMaxLength(500);
        builder.Property(p => p.TitleEn).IsRequired().HasMaxLength(500);
        builder.Property(p => p.DescriptionAr).HasMaxLength(5000);
        builder.Property(p => p.DescriptionEn).HasMaxLength(5000);
        builder.Property(p => p.Slug).IsRequired().HasMaxLength(500);
        builder.Property(p => p.AreaInHectares).HasColumnType("decimal(18,2)");
        builder.Property(p => p.ExpectedROI).HasColumnType("decimal(5,2)");

        builder.HasIndex(p => p.Slug).IsUnique();

        builder.OwnsOne(p => p.Location, loc =>
        {
            loc.Property(l => l.Latitude).HasColumnName("LocationLatitude");
            loc.Property(l => l.Longitude).HasColumnName("LocationLongitude");
            loc.Property(l => l.AddressAr).HasColumnName("LocationAddressAr").HasMaxLength(500);
            loc.Property(l => l.AddressEn).HasColumnName("LocationAddressEn").HasMaxLength(500);
        });

        builder.OwnsOne(p => p.TargetInvestment, money =>
        {
            money.Property(m => m.Amount).HasColumnName("TargetInvestmentAmount").HasColumnType("decimal(18,2)");
            money.Property(m => m.Currency).HasColumnName("TargetInvestmentCurrency").HasMaxLength(3);
        });

        builder.OwnsOne(p => p.CurrentInvestment, money =>
        {
            money.Property(m => m.Amount).HasColumnName("CurrentInvestmentAmount").HasColumnType("decimal(18,2)");
            money.Property(m => m.Currency).HasColumnName("CurrentInvestmentCurrency").HasMaxLength(3);
        });

        builder.OwnsOne(p => p.Duration, dur =>
        {
            dur.Property(d => d.StartDate).HasColumnName("DurationStartDate");
            dur.Property(d => d.EndDate).HasColumnName("DurationEndDate");
        });

        builder.HasMany(p => p.Images)
            .WithOne(i => i.Project)
            .HasForeignKey(i => i.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(p => p.Investments)
            .WithOne(i => i.Project)
            .HasForeignKey(i => i.ProjectId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(p => p.SuccessStories)
            .WithOne(s => s.Project)
            .HasForeignKey(s => s.ProjectId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
