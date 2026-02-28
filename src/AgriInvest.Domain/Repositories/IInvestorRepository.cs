using AgriInvest.Domain.Entities;

namespace AgriInvest.Domain.Repositories;

public interface IInvestorRepository
{
    Task<Investor?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Investor> AddAsync(Investor investor, CancellationToken ct = default);
}
