using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.Projects.Queries.GetAllProjects;

public record GetAllProjectsQuery : IRequest<IReadOnlyList<ProjectSummaryDto>>;
