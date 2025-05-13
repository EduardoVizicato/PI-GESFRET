namespace TMS.Domain.ValueObjects;

public class PostalCodeVO
{
    public PostalCodeVO(string postalCode)
    {
        if (!IsValidFormat(postalCode)) 
        {
            throw new ArgumentException("CEP fornecido ao construtor não está em formato válido e sanitizado.", nameof(postalCode));
        }
        PostalCode = postalCode;
    }

    public string Value => PostalCode;
    public string PostalCode { get; }
    
    public static string Sanitize(string postalCodeInput)
    {
        if (string.IsNullOrEmpty(postalCodeInput));
        return new string(postalCodeInput.Where(char.IsDigit).ToArray());
    }

    public static bool IsValidFormat(string sanitizedPostalCode)
    {
        return !string.IsNullOrWhiteSpace(sanitizedPostalCode) &&
               sanitizedPostalCode.Length == 8 &&
               sanitizedPostalCode.All(char.IsDigit);
    }
}