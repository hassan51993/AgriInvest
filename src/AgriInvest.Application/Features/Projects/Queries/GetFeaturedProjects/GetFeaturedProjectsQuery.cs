using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.Projects.Queries.GetFeaturedProjects;

public record GetFeaturedProjectsQuery(int Count = 4) : IRequest<IReadOnlyList<ProjectSummaryDto>>;
