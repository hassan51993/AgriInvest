using AgriInvest.Application.Common.Models;
using MediatR;

namespace AgriInvest.Application.Features.ContactInquiries.Commands.SubmitContactInquiry;

public record SubmitContactInquiryCommand(
    string FullName,
    string Email,
    string? Phone,
    string Subject,
    string Message) : IRequest<Result<int>>;
