namespace TMS.Domain.ValueObjects;

public class CityVO
{
    public CityVO(string city)
    {
        if(!IsValidFormat(City))
            throw new ArgumentException("Invalid City name");
    }

    public string Value => City;
    public string City { get; }

    public static bool IsValidFormat(string validCity)
    {
        if(validCity.Length < 2)
            return false;

        return true;
    }
}