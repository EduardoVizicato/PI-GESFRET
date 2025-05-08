using System.ComponentModel.DataAnnotations;
using System.Data;

namespace TMS.Domain.ValueObjects;

public class PasswordVO
{
    public PasswordVO(string password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 6)
            throw new InvalidExpressionException("The password length is invalid.");

        foreach (char c in password)
        {
            if (!Char.IsUpper(c))
            {
                throw new InvalidExpressionException("The password needs to contain one capital letter.");
            }
        }
        
        
        Password = password;
        
    }
    public string Password { get; }
    
}