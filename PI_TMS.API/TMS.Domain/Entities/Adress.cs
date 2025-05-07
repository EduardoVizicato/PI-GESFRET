using TMS.Domain.Entites;

namespace TMS.Domain.Entities;

public class Adress : BaseEntity
{
    public Adress()
    {
        
    }
    public Adress(string street, string city, string state, int postalCode, string country, int adressNumber)
    {
        Street = street;
        City = city;
        State = state;
        PostalCode = postalCode;
        AdressNumber = adressNumber;
    }
    public string Street { get; private set; }
    public string City { get; private set; }
    public string State { get; private set; }
    public int PostalCode { get; private set; }
    public int AdressNumber { get; private set; }

    public void Update(string street, string city, string state, int postalCode, string country, int adressNumber)
    {
        Street = street;
        City = city;
        State = state;
        PostalCode = postalCode;
        AdressNumber = adressNumber;
    }
}