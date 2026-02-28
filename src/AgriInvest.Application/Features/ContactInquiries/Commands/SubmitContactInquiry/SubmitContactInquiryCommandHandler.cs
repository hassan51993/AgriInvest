using AgriInvest.Application.Common.Models;
using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Enums;
using AgriInvest.Domain.Repositories;
using MediatR;

namespace AgriInvest.Application.Features.ContactInquiries.Commands.SubmitContactInquiry;

public class SubmitContactInquiryCommandHandler : IRequestHandler<SubmitContactInquiryCommand, Result<int>>
{
    private readonly IContactInquiryRepository _contactInquiryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public SubmitContactInquiryCommandHandler(
        IContactInquiryRepository contactInquiryRepository,
        IUnitOfWork unitOfWork)
    {
        _contactInquiryRepository = contactInquiryRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<int>> Handle(
        SubmitContactInquiryCommand request,
        CancellationToken cancellationToken)
    {
        var inquiry = new ContactInquiry
        {
            FullName = request.FullName,
            Email = request.Email,
            Phone = request.Phone,
            Subject = request.Subject,
            Message = request.Message,
            Status = InquiryStatus.New,
            SubmittedAt = DateTime.UtcNow
        };

        var created = await _contactInquiryRepository.AddAsync(inquiry, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<int>.Success(created.Id);
    }
}
