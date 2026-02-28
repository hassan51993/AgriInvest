using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.SuccessStories.Queries.GetAllSuccessStories;

public class GetAllSuccessStoriesQueryHandler : IRequestHandler<GetAllSuccessStoriesQuery, IReadOnlyList<SuccessStorySummaryDto>>
{
    private readonly ISuccessStoryRepository _successStoryRepository;
    private readonly IMapper _mapper;

    public GetAllSuccessStoriesQueryHandler(ISuccessStoryRepository successStoryRepository, IMapper mapper)
    {
        _successStoryRepository = successStoryRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<SuccessStorySummaryDto>> Handle(
        GetAllSuccessStoriesQuery request,
        CancellationToken cancellationToken)
    {
        var stories = await _successStoryRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<IReadOnlyList<SuccessStorySummaryDto>>(stories);
    }
}
