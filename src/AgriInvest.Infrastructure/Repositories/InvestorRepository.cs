using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class InvestorRepository : IInvestorRepository
{
    private readonly AgriInvestDbContext _context;

    public InvestorRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<Investor?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.Investors
            .Include(i => i.Investments)
            .FirstOrDefaultAsync(i => i.Id == id, ct);
    }

    public async Task<Investor> AddAsync(Investor investor, CancellationToken ct = default)
    {
        await _context.Investors.AddAsync(investor, ct);
        return investor;
    }
}
