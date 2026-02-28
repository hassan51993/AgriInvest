using AgriInvest.Application.DTOs;
using AgriInvest.Application.Features.TeamMembers.Queries.GetAllTeamMembers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly IMediator _mediator;

    public TeamController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TeamMemberDto>>> GetAll(CancellationToken ct)
    {
        return Ok(await _mediator.Send(new GetAllTeamMembersQuery(), ct));
    }
}
