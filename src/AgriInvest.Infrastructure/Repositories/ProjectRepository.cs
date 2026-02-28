using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Enums;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AgriInvestDbContext _context;

    public ProjectRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<Project?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.Projects
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Id == id, ct);
    }

    public async Task<Project?> GetBySlugAsync(string slug, CancellationToken ct = default)
    {
        return await _context.Projects
            .Include(p => p.Images)
            .FirstOrDefaultAsync(p => p.Slug == slug, ct);
    }

    public async Task<IReadOnlyList<Project>> GetAllActiveAsync(CancellationToken ct = default)
    {
        return await _context.Projects
            .Where(p => p.IsActive)
            .OrderBy(p => p.SortOrder)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Project>> GetByTypeAsync(ProjectType type, CancellationToken ct = default)
    {
        return await _context.Projects
            .Where(p => p.Type == type && p.IsActive)
            .OrderBy(p => p.SortOrder)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Project>> GetFeaturedAsync(int count = 4, CancellationToken ct = default)
    {
        return await _context.Projects
            .Where(p => p.IsActive)
            .OrderBy(p => p.SortOrder)
            .Take(count)
            .ToListAsync(ct);
    }

    public async Task<Project> AddAsync(Project project, CancellationToken ct = default)
    {
        await _context.Projects.AddAsync(project, ct);
        return project;
    }

    public void Update(Project project)
    {
        _context.Projects.Update(project);
    }

    public void Delete(Project project)
    {
        _context.Projects.Remove(project);
    }
}
