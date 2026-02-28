using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.MediaItems.Queries.GetMediaByType;

public class GetMediaByTypeQueryHandler : IRequestHandler<GetMediaByTypeQuery, IReadOnlyList<MediaItemDto>>
{
    private readonly IMediaItemRepository _mediaItemRepository;
    private readonly IMapper _mapper;

    public GetMediaByTypeQueryHandler(IMediaItemRepository mediaItemRepository, IMapper mapper)
    {
        _mediaItemRepository = mediaItemRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<MediaItemDto>> Handle(
        GetMediaByTypeQuery request,
        CancellationToken cancellationToken)
    {
        var items = await _mediaItemRepository.GetByTypeAsync(request.Type, cancellationToken);
        return _mapper.Map<IReadOnlyList<MediaItemDto>>(items);
    }
}
