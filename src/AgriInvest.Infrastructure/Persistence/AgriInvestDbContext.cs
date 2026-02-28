using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Persistence;

public class AgriInvestDbContext : DbContext, IUnitOfWork
{
    public AgriInvestDbContext(DbContextOptions<AgriInvestDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Investment> Investments => Set<Investment>();
    public DbSet<Investor> Investors => Set<Investor>();
    public DbSet<SuccessStory> SuccessStories => Set<SuccessStory>();
    public DbSet<MediaItem> MediaItems => Set<MediaItem>();
    public DbSet<TeamMember> TeamMembers => Set<TeamMember>();
    public DbSet<ContactInquiry> ContactInquiries => Set<ContactInquiry>();
    public DbSet<PageContent> PageContents => Set<PageContent>();
    public DbSet<ProjectImage> ProjectImages => Set<ProjectImage>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AgriInvestDbContext).Assembly);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
    {
        return await base.SaveChangesAsync(ct);
    }

    public new void Dispose()
    {
        base.Dispose();
    }
}
