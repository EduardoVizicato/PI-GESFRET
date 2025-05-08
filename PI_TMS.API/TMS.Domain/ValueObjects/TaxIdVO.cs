using System.Data;

namespace TMS.Domain.ValueObjects;

public class TaxIdVO
{
    public TaxIdVO(string taxId)
    {
        if (string.IsNullOrWhiteSpace(taxId) || taxId.Length != 8)
            throw new InvalidExpressionException("The tax id format is invalid.");
        
        TaxId = taxId;
    }
    public string TaxId { get; set; }
}