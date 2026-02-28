using AgriInvest.Domain.Entities;

namespace AgriInvest.Domain.Repositories;

public interface ITeamMemberRepository
{
    Task<IReadOnlyList<TeamMember>> GetAllAsync(CancellationToken ct = default);
}
