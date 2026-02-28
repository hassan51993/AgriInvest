using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Repositories;
using AutoMapper;
using MediatR;

namespace AgriInvest.Application.Features.TeamMembers.Queries.GetAllTeamMembers;

public class GetAllTeamMembersQueryHandler : IRequestHandler<GetAllTeamMembersQuery, IReadOnlyList<TeamMemberDto>>
{
    private readonly ITeamMemberRepository _teamMemberRepository;
    private readonly IMapper _mapper;

    public GetAllTeamMembersQueryHandler(ITeamMemberRepository teamMemberRepository, IMapper mapper)
    {
        _teamMemberRepository = teamMemberRepository;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<TeamMemberDto>> Handle(
        GetAllTeamMembersQuery request,
        CancellationToken cancellationToken)
    {
        var members = await _teamMemberRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<IReadOnlyList<TeamMemberDto>>(members);
    }
}
