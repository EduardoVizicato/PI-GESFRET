using System.Data;
using System.Text.RegularExpressions;
using Abp.Domain.Values;
using Abp.Extensions;

namespace TMS.Domain.ValueObjects;

public class StreetVO
{
    public StreetVO(string street)
    {
        if (string.IsNullOrEmpty(street) || street.Length > 35 ||  street.Length < 2)
            throw new InvalidExpressionException("Invalid Street name");
        
        Street = street;
    }

    public string Value => Street;
    public string Street { get; }
}