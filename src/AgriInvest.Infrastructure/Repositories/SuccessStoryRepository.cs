using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class SuccessStoryRepository : ISuccessStoryRepository
{
    private readonly AgriInvestDbContext _context;

    public SuccessStoryRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<SuccessStory?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.SuccessStories
            .Include(s => s.Project)
            .FirstOrDefaultAsync(s => s.Id == id, ct);
    }

    public async Task<SuccessStory?> GetBySlugAsync(string slug, CancellationToken ct = default)
    {
        return await _context.SuccessStories
            .Include(s => s.Project)
            .FirstOrDefaultAsync(s => s.Slug == slug, ct);
    }

    public async Task<IReadOnlyList<SuccessStory>> GetAllAsync(CancellationToken ct = default)
    {
        return await _context.SuccessStories
            .Where(s => s.IsActive)
            .OrderByDescending(s => s.PublishDate)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<SuccessStory>> GetFeaturedAsync(int count = 3, CancellationToken ct = default)
    {
        return await _context.SuccessStories
            .Where(s => s.IsFeatured && s.IsActive)
            .OrderByDescending(s => s.PublishDate)
            .Take(count)
            .ToListAsync(ct);
    }

    public async Task<SuccessStory> AddAsync(SuccessStory story, CancellationToken ct = default)
    {
        await _context.SuccessStories.AddAsync(story, ct);
        return story;
    }

    public void Update(SuccessStory story)
    {
        _context.SuccessStories.Update(story);
    }
}
