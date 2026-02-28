using AgriInvest.Domain.Entities;

namespace AgriInvest.Domain.Repositories;

public interface IPageContentRepository
{
    Task<IReadOnlyList<PageContent>> GetByPageKeyAsync(string pageKey, CancellationToken ct = default);
}
