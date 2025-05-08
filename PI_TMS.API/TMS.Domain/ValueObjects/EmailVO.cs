using System.Data;
using System.Text.RegularExpressions;
using Abp.Domain.Values;
using Abp.Extensions;

namespace TMS.Domain.ValueObjects;

public class EmailVO 
{
    public EmailVO(string emailAdress)
    {
        if (string.IsNullOrEmpty(emailAdress) || emailAdress.Length <= 5)
        {
            throw new InvalidExpressionException("The email needs to contain at least 5 characters.");
        }
        
        EmailAdress = emailAdress.ToLower().Trim();
        const string pattern = @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";

        if (!Regex.IsMatch(emailAdress, pattern))
        {
            throw new InvalidExpressionException("The email address format is invalid.");
        }
    }
    
    public string EmailAdress { get; }
}