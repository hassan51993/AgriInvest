using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.SuccessStories.Queries.GetAllSuccessStories;

public record GetAllSuccessStoriesQuery : IRequest<IReadOnlyList<SuccessStorySummaryDto>>;
