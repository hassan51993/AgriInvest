namespace AgriInvest.Domain.ValueObjects;

public class Money
{
    public decimal Amount { get; private set; }
    public string Currency { get; private set; } = "EGP";

    public Money(decimal amount, string currency = "EGP")
    {
        Amount = amount;
        Currency = currency;
    }

    private Money() { }
}
