namespace TMS.Domain.Entities.Requests.Adress;

public class AdressRequest
{
    public string Street { get; private set; }
    public string City { get; private set; }
    public string State { get; private set; }
    public int PostalCode { get; private set; }
    public int AdressNumber { get; private set; }
}