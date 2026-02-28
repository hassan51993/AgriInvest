using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Enums;
using MediatR;

namespace AgriInvest.Application.Features.MediaItems.Queries.GetMediaByType;

public record GetMediaByTypeQuery(MediaType Type) : IRequest<IReadOnlyList<MediaItemDto>>;
