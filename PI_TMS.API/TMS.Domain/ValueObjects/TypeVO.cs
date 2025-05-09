using System.Data;
using System.Text.RegularExpressions;
using Abp.Domain.Values;
using Abp.Extensions;

namespace TMS.Domain.ValueObjects;

public class TypeVO
{
    public TypeVO(string type)
    {
        if(string.IsNullOrEmpty(type))
            throw new ArgumentException("Value cannot be null or empty.");
        
        Type = type;
    }
    public string Value => Value;
    public string Type{ get; }
}