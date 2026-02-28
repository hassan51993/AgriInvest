using AgriInvest.Application.Common.Models;
using AgriInvest.Application.Features.ContactInquiries.Commands.SubmitContactInquiry;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IMediator _mediator;

    public ContactController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<ActionResult<Result<int>>> Submit(
        [FromBody] SubmitContactInquiryCommand command,
        CancellationToken ct)
    {
        var result = await _mediator.Send(command, ct);
        return result.IsSuccess
            ? CreatedAtAction(null, new { id = result.Value }, result)
            : BadRequest(result);
    }
}
