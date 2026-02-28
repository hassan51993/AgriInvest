using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.SuccessStories.Queries.GetFeaturedSuccessStories;

public record GetFeaturedSuccessStoriesQuery(int Count = 3) : IRequest<IReadOnlyList<SuccessStorySummaryDto>>;
