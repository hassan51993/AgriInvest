using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.MediaItems.Queries.GetMediaItems;

public class GetMediaItemsQueryHandler : IRequestHandler<GetMediaItemsQuery, IReadOnlyList<MediaItemDto>>
{
    private readonly IMediaItemRepository _mediaItemRepository;
    private readonly IMapper _mapper;

    public GetMediaItemsQueryHandler(IMediaItemRepository mediaItemRepository, IMapper mapper)
    {
        _mediaItemRepository = mediaItemRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<MediaItemDto>> Handle(
        GetMediaItemsQuery request,
        CancellationToken cancellationToken)
    {
        var items = await _mediaItemRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<IReadOnlyList<MediaItemDto>>(items);
    }
}
