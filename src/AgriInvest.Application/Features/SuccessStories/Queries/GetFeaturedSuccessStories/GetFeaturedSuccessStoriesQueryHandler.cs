using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.SuccessStories.Queries.GetFeaturedSuccessStories;

public class GetFeaturedSuccessStoriesQueryHandler : IRequestHandler<GetFeaturedSuccessStoriesQuery, IReadOnlyList<SuccessStorySummaryDto>>
{
    private readonly ISuccessStoryRepository _successStoryRepository;
    private readonly IMapper _mapper;

    public GetFeaturedSuccessStoriesQueryHandler(ISuccessStoryRepository successStoryRepository, IMapper mapper)
    {
        _successStoryRepository = successStoryRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<SuccessStorySummaryDto>> Handle(
        GetFeaturedSuccessStoriesQuery request,
        CancellationToken cancellationToken)
    {
        var stories = await _successStoryRepository.GetFeaturedAsync(request.Count, cancellationToken);
        return _mapper.Map<IReadOnlyList<SuccessStorySummaryDto>>(stories);
    }
}
