using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.MediaItems.Queries.GetMediaItems;

public record GetMediaItemsQuery : IRequest<IReadOnlyList<MediaItemDto>>;
