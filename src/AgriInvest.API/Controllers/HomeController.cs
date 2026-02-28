using AgriInvest.Application.DTOs;
using AgriInvest.Application.Features.PageContents.Queries.GetPageContent;
using AgriInvest.Application.Features.Projects.Queries.GetFeaturedProjects;
using AgriInvest.Application.Features.SuccessStories.Queries.GetFeaturedSuccessStories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AgriInvest.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    private readonly IMediator _mediator;

    public HomeController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<HomePageDto>> Get(CancellationToken ct)
    {
        var projects = await _mediator.Send(new GetFeaturedProjectsQuery(), ct);
        var stories = await _mediator.Send(new GetFeaturedSuccessStoriesQuery(), ct);
        var heroContent = await _mediator.Send(new GetPageContentQuery("home"), ct);

        return Ok(new HomePageDto
        {
            HeroContent = heroContent.ToList(),
            FeaturedProjects = projects.ToList(),
            FeaturedSuccessStories = stories.ToList()
        });
    }
}
