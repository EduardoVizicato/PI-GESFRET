using System.ComponentModel.DataAnnotations;
using System.Data;

namespace TMS.Domain.ValueObjects;

public class PasswordVO
{
    public PasswordVO(string password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 6)
            throw new InvalidExpressionException("The password length is invalid.");

        if (!password.Any(char.IsUpper))
            throw new InvalidExpressionException("The password needs to contain at least one capital letter.");
        
        Password = password;
        
    }
    
    public string Value =>  Password;
    public string Password { get; }
    
}