using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;

namespace AgriInvest.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AgriInvestDbContext _context;

    public UnitOfWork(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken ct = default)
    {
        return await _context.SaveChangesAsync(ct);
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
