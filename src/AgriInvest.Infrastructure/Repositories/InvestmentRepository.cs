using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class InvestmentRepository : IInvestmentRepository
{
    private readonly AgriInvestDbContext _context;

    public InvestmentRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<Investment?> GetByIdAsync(int id, CancellationToken ct = default)
    {
        return await _context.Investments
            .Include(i => i.Project)
            .Include(i => i.Investor)
            .FirstOrDefaultAsync(i => i.Id == id, ct);
    }

    public async Task<IReadOnlyList<Investment>> GetByProjectIdAsync(int projectId, CancellationToken ct = default)
    {
        return await _context.Investments
            .Where(i => i.ProjectId == projectId)
            .Include(i => i.Investor)
            .OrderByDescending(i => i.InvestmentDate)
            .ToListAsync(ct);
    }

    public async Task<Investment> AddAsync(Investment investment, CancellationToken ct = default)
    {
        await _context.Investments.AddAsync(investment, ct);
        return investment;
    }
}
