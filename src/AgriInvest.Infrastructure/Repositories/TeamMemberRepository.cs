using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AgriInvest.Infrastructure.Repositories;

public class TeamMemberRepository : ITeamMemberRepository
{
    private readonly AgriInvestDbContext _context;

    public TeamMemberRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<TeamMember>> GetAllAsync(CancellationToken ct = default)
    {
        return await _context.TeamMembers
            .Where(t => t.IsActive)
            .OrderBy(t => t.SortOrder)
            .ToListAsync(ct);
    }
}
