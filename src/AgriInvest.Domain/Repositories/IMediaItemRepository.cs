using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Enums;

namespace AgriInvest.Domain.Repositories;

public interface IMediaItemRepository
{
    Task<MediaItem?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<IReadOnlyList<MediaItem>> GetAllAsync(CancellationToken ct = default);
    Task<IReadOnlyList<MediaItem>> GetByTypeAsync(MediaType type, CancellationToken ct = default);
    Task<MediaItem> AddAsync(MediaItem item, CancellationToken ct = default);
    void Update(MediaItem item);
}
