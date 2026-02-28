namespace AgriInvest.Domain.ValueObjects;

public class GeoLocation
{
    public double Latitude { get; private set; }
    public double Longitude { get; private set; }
    public string? AddressAr { get; private set; }
    public string? AddressEn { get; private set; }

    public GeoLocation(double latitude, double longitude, string? addressAr = null, string? addressEn = null)
    {
        Latitude = latitude;
        Longitude = longitude;
        AddressAr = addressAr;
        AddressEn = addressEn;
    }

    private GeoLocation() { }
}
