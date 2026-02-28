using AgriInvest.Application.DTOs;
using MediatR;

namespace AgriInvest.Application.Features.TeamMembers.Queries.GetAllTeamMembers;

public record GetAllTeamMembersQuery : IRequest<IReadOnlyList<TeamMemberDto>>;
