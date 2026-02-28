using AgriInvest.Application.DTOs;
using AgriInvest.Application.Features.MediaItems.Queries.GetMediaByType;
using AgriInvest.Application.Features.MediaItems.Queries.GetMediaItems;
using AgriInvest.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IMediator _mediator;

    public MediaController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<MediaItemDto>>> GetAll(CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetMediaItemsQuery(), ct));
    }

    [HttpGet("type/{type}")]
    public async Task<ActionResult<IReadOnlyList<MediaItemDto>>> GetByType(MediaType type, CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetMediaByTypeQuery(type), ct));
    }
}
