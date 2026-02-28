using AgriInvest.Application.Common.Models;
using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.SuccessStories.Queries.GetSuccessStoryBySlug;

public class GetSuccessStoryBySlugQueryHandler : IRequestHandler<GetSuccessStoryBySlugQuery, Result<SuccessStoryDto>>
{
    private readonly ISuccessStoryRepository _successStoryRepository;
    private readonly IMapper _mapper;

    public GetSuccessStoryBySlugQueryHandler(ISuccessStoryRepository successStoryRepository, IMapper mapper)
    {
        _successStoryRepository = successStoryRepository;
        _mapper = mapper;
    }

    public async Task<Result<SuccessStoryDto>> Handle(
        GetSuccessStoryBySlugQuery request,
        CancellationToken cancellationToken)
    {
        var story = await _successStoryRepository.GetBySlugAsync(request.Slug, cancellationToken);

        if (story is null)
        {
            return Result<SuccessStoryDto>.Failure($"Success story with slug '{request.Slug}' was not found.");
        }

        var dto = _mapper.Map<SuccessStoryDto>(story);
        return Result<SuccessStoryDto>.Success(dto);
    }
}
