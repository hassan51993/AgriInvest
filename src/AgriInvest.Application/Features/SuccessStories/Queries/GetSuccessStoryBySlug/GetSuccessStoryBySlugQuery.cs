using AgriInvest.Application.Common.Models;
using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.SuccessStories.Queries.GetSuccessStoryBySlug;

public record GetSuccessStoryBySlugQuery(string Slug) : IRequest<Result<SuccessStoryDto>>;
