using AgriInvest.Application.Common.Models;
using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.Projects.Queries.GetProjectBySlug;

public class GetProjectBySlugQueryHandler : IRequestHandler<GetProjectBySlugQuery, Result<ProjectDto>>
{
    private readonly IProjectRepository _projectRepository;
    private readonly IMapper _mapper;

    public GetProjectBySlugQueryHandler(IProjectRepository projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
    }

    public async Task<Result<ProjectDto>> Handle(
        GetProjectBySlugQuery request,
        CancellationToken cancellationToken)
    {
        var project = await _projectRepository.GetBySlugAsync(request.Slug, cancellationToken);

        if (project is null)
        {
            return Result<ProjectDto>.Failure($"Project with slug '{request.Slug}' was not found.");
        }

        var dto = _mapper.Map<ProjectDto>(project);
        return Result<ProjectDto>.Success(dto);
    }
}
