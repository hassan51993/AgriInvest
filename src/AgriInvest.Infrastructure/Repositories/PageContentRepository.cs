using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class PageContentRepository : IPageContentRepository
{
    private readonly AgriInvestDbContext _context;

    public PageContentRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<PageContent>> GetByPageKeyAsync(string pageKey, CancellationToken ct = default)
    {
        return await _context.PageContents
            .Where(p => p.PageKey == pageKey && p.IsActive)
            .OrderBy(p => p.SortOrder)
            .ToListAsync(ct);
    }
}
