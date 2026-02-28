using AgriInvest.Domain.Entities;

namespace AgriInvest.Domain.Repositories;

public interface IContactInquiryRepository
{
    Task<ContactInquiry> AddAsync(ContactInquiry inquiry, CancellationToken ct = default);
}
