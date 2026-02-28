using AgriInvest.Domain.Entities;

namespace AgriInvest.Domain.Repositories;

public interface IInvestmentRepository
{
    Task<Investment?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IReadOnlyList<Investment>> GetByProjectIdAsync(int projectId, CancellationToken ct = default);
    Task<Investment> AddAsync(Investment investment, CancellationToken ct = default);
}
