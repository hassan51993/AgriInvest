using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.PageContents.Queries.GetPageContent;

public record GetPageContentQuery(string PageKey) : IRequest<IReadOnlyList<PageContentDto>>;
