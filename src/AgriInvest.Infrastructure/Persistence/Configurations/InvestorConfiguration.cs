using AgriInvest.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AgriInvest.Infrastructure.Persistence.Configurations;

public class InvestorConfiguration : IEntityTypeConfiguration<Investor>
{
    public void Configure(EntityTypeBuilder<Investor> builder)
    {
        builder.HasKey(i => i.Id);

        builder.Property(i => i.FullNameAr).IsRequired().HasMaxLength(200);
        builder.Property(i => i.FullNameEn).IsRequired().HasMaxLength(200);
        builder.Property(i => i.Email).IsRequired().HasMaxLength(256);
        builder.Property(i => i.Phone).IsRequired().HasMaxLength(50);
        builder.Property(i => i.Company).HasMaxLength(300);
        builder.Property(i => i.Nationality).HasMaxLength(100);

        builder.HasMany(i => i.Investments)
            .WithOne(inv => inv.Investor)
            .HasForeignKey(inv => inv.InvestorId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
