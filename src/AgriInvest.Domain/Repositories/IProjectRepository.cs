using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Enums;

namespace AgriInvest.Domain.Repositories;

public interface IProjectRepository
{
    Task<Project?> GetByIdAsync(int id, CancellationToken ct = default);
    Task<Project?> GetBySlugAsync(string slug, CancellationToken ct = default);
    Task<IReadOnlyList<Project>> GetAllActiveAsync(CancellationToken ct = default);
    Task<IReadOnlyList<Project>> GetByTypeAsync(ProjectType type, CancellationToken ct = default);
    Task<IReadOnlyList<Project>> GetFeaturedAsync(int count = 4, CancellationToken ct = default);
    Task<Project> AddAsync(Project project, CancellationToken ct = default);
    void Update(Project project);
    void Delete(Project project);
}
