using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Enums;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class MediaItemRepository : IMediaItemRepository
{
    private readonly AgriInvestDbContext _context;

    public MediaItemRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<MediaItem?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.MediaItems
            .FirstOrDefaultAsync(m => m.Id == id, ct);
    }

    public async Task<IReadOnlyList<MediaItem>> GetAllAsync(CancellationToken ct = default)
    {
        return await _context.MediaItems
            .Where(m => m.IsActive)
            .OrderByDescending(m => m.PublishDate)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<MediaItem>> GetByTypeAsync(MediaType type, CancellationToken ct = default)
    {
        return await _context.MediaItems
            .Where(m => m.Type == type && m.IsActive)
            .OrderByDescending(m => m.PublishDate)
            .ToListAsync(ct);
    }

    public async Task<MediaItem> AddAsync(MediaItem item, CancellationToken ct = default)
    {
        await _context.MediaItems.AddAsync(item, ct);
        return item;
    }

    public void Update(MediaItem item)
    {
        _context.MediaItems.Update(item);
    }
}
