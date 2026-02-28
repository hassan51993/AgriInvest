using AgriInvest.Application.Common.Models;
using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.Projects.Queries.GetProjectBySlug;

public record GetProjectBySlugQuery(string Slug) : IRequest<Result<ProjectDto>>;
