using AgriInvest.Application.DTOs;
using AgriInvest.Application.Features.Projects.Queries.GetAllProjects;
using AgriInvest.Application.Features.Projects.Queries.GetFeaturedProjects;
using AgriInvest.Application.Features.Projects.Queries.GetProjectBySlug;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProjectsController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProjectSummaryDto>>> GetAll(CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetAllProjectsQuery(), ct));
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IReadOnlyList<ProjectSummaryDto>>> GetFeatured(CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetFeaturedProjectsQuery(), ct));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ProjectDto>> GetBySlug(string slug, CancellationToken ct)
    {
        var result = await _mediator.Send(new GetProjectBySlugQuery(slug), ct);
        return result.IsSuccess ? Ok(result.Value) : NotFound();
    }
}
