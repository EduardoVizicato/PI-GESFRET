namespace TMS.Domain.ValueObjects;

public class VehicleRegistrationPlateVO
{
    public VehicleRegistrationPlateVO(string registrationPlate)
    {
        if (string.IsNullOrEmpty(registrationPlate))
            throw new ArgumentException("Value cannot be null", nameof(registrationPlate));
        RegistrationPlate = registrationPlate;
    }
    
    public string Value => RegistrationPlate;
    public string RegistrationPlate { get; set; }
}