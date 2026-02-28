using AgriInvest.Application.DTOs;
using AgriInvest.Domain.Entities;
using AutoMapper;

namespace AgriInvest.Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Project -> ProjectDto (flatten Value Objects)
        CreateMap<Project, ProjectDto>()
            .ForMember(d => d.LocationLatitude, opt => opt.MapFrom(s => s.Location.Latitude))
            .ForMember(d => d.LocationLongitude, opt => opt.MapFrom(s => s.Location.Longitude))
            .ForMember(d => d.LocationAddressAr, opt => opt.MapFrom(s => s.Location.AddressAr))
            .ForMember(d => d.LocationAddressEn, opt => opt.MapFrom(s => s.Location.AddressEn))
            .ForMember(d => d.TargetInvestmentAmount, opt => opt.MapFrom(s => s.TargetInvestment.Amount))
            .ForMember(d => d.TargetInvestmentCurrency, opt => opt.MapFrom(s => s.TargetInvestment.Currency))
            .ForMember(d => d.CurrentInvestmentAmount, opt => opt.MapFrom(s => s.CurrentInvestment.Amount))
            .ForMember(d => d.CurrentInvestmentCurrency, opt => opt.MapFrom(s => s.CurrentInvestment.Currency))
            .ForMember(d => d.DurationStartDate, opt => opt.MapFrom(s => s.Duration.StartDate))
            .ForMember(d => d.DurationEndDate, opt => opt.MapFrom(s => s.Duration.EndDate));

        // Project -> ProjectSummaryDto (flatten key Value Object fields)
        CreateMap<Project, ProjectSummaryDto>()
            .ForMember(d => d.TargetInvestmentAmount, opt => opt.MapFrom(s => s.TargetInvestment.Amount))
            .ForMember(d => d.CurrentInvestmentAmount, opt => opt.MapFrom(s => s.CurrentInvestment.Amount))
            .ForMember(d => d.LocationAddressEn, opt => opt.MapFrom(s => s.Location.AddressEn))
            .ForMember(d => d.LocationAddressAr, opt => opt.MapFrom(s => s.Location.AddressAr));

        // SuccessStory -> SuccessStoryDto
        CreateMap<SuccessStory, SuccessStoryDto>();

        // SuccessStory -> SuccessStorySummaryDto
        CreateMap<SuccessStory, SuccessStorySummaryDto>();

        // MediaItem -> MediaItemDto
        CreateMap<MediaItem, MediaItemDto>();

        // TeamMember -> TeamMemberDto
        CreateMap<TeamMember, TeamMemberDto>();

        // ContactInquiry -> ContactInquiryDto
        CreateMap<ContactInquiry, ContactInquiryDto>();

        // PageContent -> PageContentDto
        CreateMap<PageContent, PageContentDto>();
    }
}
