using AgriInvest.Application.DTOs;
using AgriInvest.Application.Features.SuccessStories.Queries.GetAllSuccessStories;
using AgriInvest.Application.Features.SuccessStories.Queries.GetFeaturedSuccessStories;
using AgriInvest.Application.Features.SuccessStories.Queries.GetSuccessStoryBySlug;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/success-stories")]
public class SuccessStoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public SuccessStoriesController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<SuccessStorySummaryDto>>> GetAll(CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetAllSuccessStoriesQuery(), ct));
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IReadOnlyList<SuccessStorySummaryDto>>> GetFeatured(CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetFeaturedSuccessStoriesQuery(), ct));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<SuccessStoryDto>> GetBySlug(string slug, CancellationToken ct)
    {
        var result = await _mediator.Send(new GetSuccessStoryBySlugQuery(slug), ct);
        return result.IsSuccess ? Ok(result.Value) : NotFound();
    }
}
