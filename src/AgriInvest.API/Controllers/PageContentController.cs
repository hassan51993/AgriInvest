using AgriInvest.Application.DTOs;
using AgriInvest.Application.Features.PageContents.Queries.GetPageContent;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/pages")]
public class PageContentController : ControllerBase
{
    private readonly IMediator _mediator;

    public PageContentController(IMediator mediator) => _mediator = mediator;

    [HttpGet("{pageKey}")]
    public async Task<ActionResult<IReadOnlyList<PageContentDto>>> GetByPageKey(string pageKey, CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetPageContentQuery(pageKey), ct));
    }
}
