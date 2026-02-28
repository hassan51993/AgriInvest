using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.PageContents.Queries.GetPageContent;

public class GetPageContentQueryHandler : IRequestHandler<GetPageContentQuery, IReadOnlyList<PageContentDto>>
{
    private readonly IPageContentRepository _pageContentRepository;
    private readonly IMapper _mapper;

    public GetPageContentQueryHandler(IPageContentRepository pageContentRepository, IMapper mapper)
    {
        _pageContentRepository = pageContentRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<PageContentDto>> Handle(
        GetPageContentQuery request,
        CancellationToken cancellationToken)
    {
        var contents = await _pageContentRepository.GetByPageKeyAsync(request.PageKey, cancellationToken);
        return _mapper.Map<IReadOnlyList<PageContentDto>>(contents);
    }
}
