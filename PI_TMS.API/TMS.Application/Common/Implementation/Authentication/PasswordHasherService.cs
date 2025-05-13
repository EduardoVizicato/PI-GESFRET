using Microsoft.AspNetCore.Identity;
using TMS.Application.Common.Interface.Authentication;
using TMS.Domain.Repositories;
using TMS.Domain.ValueObjects;

namespace TMS.Application.Common.Implementation.Authentication;

public class PasswordHasherService : IPasswordHasherService
{
    private readonly PasswordHasher <object>_passwordHasher;
    
    public PasswordHasherService()
    {
        _passwordHasher = new PasswordHasher<object>();
    }
    public string HashPassword(PasswordVO password)
    {
        return _passwordHasher.HashPassword(null, password.Value);
    }

    public bool VerifyPassword(PasswordVO hashedPassword, PasswordVO providedPassword)
    {
        var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword.Value, providedPassword.Value);
        return result == PasswordVerificationResult.Success;
    }
}