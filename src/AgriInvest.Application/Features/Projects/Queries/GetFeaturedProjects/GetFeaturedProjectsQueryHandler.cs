using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.Projects.Queries.GetFeaturedProjects;

public class GetFeaturedProjectsQueryHandler : IRequestHandler<GetFeaturedProjectsQuery, IReadOnlyList<ProjectSummaryDto>>
{
    private readonly IProjectRepository _projectRepository;
    private readonly IMapper _mapper;

    public GetFeaturedProjectsQueryHandler(IProjectRepository projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<ProjectSummaryDto>> Handle(
        GetFeaturedProjectsQuery request,
        CancellationToken cancellationToken)
    {
        var projects = await _projectRepository.GetFeaturedAsync(request.Count, cancellationToken);
        return _mapper.Map<IReadOnlyList<ProjectSummaryDto>>(projects);
    }
}
