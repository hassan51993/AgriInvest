using AgriInvest.Domain.Entities;
using AgriInvest.Domain.Repositories;
using AgriInvest.Infrastructure.Persistence;

namespace AgriInvest.Infrastructure.Repositories;

public class ContactInquiryRepository : IContactInquiryRepository
{
    private readonly AgriInvestDbContext _context;

    public ContactInquiryRepository(AgriInvestDbContext context)
    {
        _context = context;
    }

    public async Task<ContactInquiry> AddAsync(ContactInquiry inquiry, CancellationToken ct = default)
    {
        await _context.ContactInquiries.AddAsync(inquiry, ct);
        return inquiry;
    }
}
