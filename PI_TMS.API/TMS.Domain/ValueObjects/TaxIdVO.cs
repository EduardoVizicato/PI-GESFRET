using System.Data;

namespace TMS.Domain.ValueObjects;

public class TaxIdVO
{
    public TaxIdVO(string taxId)
    {
        if (!IsValidFormat(taxId))
            throw new InvalidExpressionException("The tax id format is invalid.");
        
        TaxId = taxId;
    }
    
    public string Value =>  TaxId;
    public string TaxId { get; set; }
    
    
    public static string Sanitize(string taxIdInput)
    {
        if (string.IsNullOrEmpty(taxIdInput))
        {
<<<<<<< HEAD
            return string.Empty;
        }

=======
            throw new Exception("The tax id is empty.");
        }
>>>>>>> main
        return new string(taxIdInput.Where(char.IsDigit).ToArray());
    }

    public static bool IsValidFormat(string sanitizedTaxId)
    {
        return !string.IsNullOrWhiteSpace(sanitizedTaxId) &&
               sanitizedTaxId.Length == 11 &&
               sanitizedTaxId.All(char.IsDigit);
    }
}  