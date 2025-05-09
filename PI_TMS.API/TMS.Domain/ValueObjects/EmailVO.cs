using System.Data;
using System.Text.RegularExpressions;
using Abp.Domain.Values;
using Abp.Extensions;

namespace TMS.Domain.ValueObjects;

public class EmailVO 
{
    public EmailVO(string emailAdress)
    {
        if (string.IsNullOrWhiteSpace(emailAdress))
            throw new ArgumentException("Email cannot be empty or null.");

        emailAdress = emailAdress.Trim().ToLowerInvariant();

        if (!IsValidFormat(emailAdress))
            throw new ArgumentException("Invalid email format.");

        EmailAdress = emailAdress;
    }
    public string Value =>  EmailAdress;
    public string EmailAdress { get; }
    
    public static bool IsValidFormat(string validEmail)
    {
        if (validEmail.Length < 5 || validEmail.Length > 250)
            return false;

        const string pattern = @"^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,4}$";
        return Regex.IsMatch(validEmail, pattern);  
    }
}