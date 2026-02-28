using AgriInvest.Domain.Entities;

namespace AgriInvest.Domain.Repositories;

public interface ISuccessStoryRepository
{
    Task<SuccessStory?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<SuccessStory?> GetBySlugAsync(string slug, CancellationToken ct = default);
    Task<IReadOnlyList<SuccessStory>> GetAllAsync(CancellationToken ct = default);
    Task<IReadOnlyList<SuccessStory>> GetFeaturedAsync(int count = 3, CancellationToken ct = default);
    Task<SuccessStory> AddAsync(SuccessStory story, CancellationToken ct = default);
    void Update(SuccessStory story);
}
