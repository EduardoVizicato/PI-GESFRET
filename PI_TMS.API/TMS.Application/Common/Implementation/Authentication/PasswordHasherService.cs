using Microsoft.AspNetCore.Identity;
using TMS.Application.Common.Interface.Authentication;
using TMS.Domain.Repositories;

namespace TMS.Application.Common.Implementation.Authentication;

public class PasswordHasherService : IPasswordHasherService
{
    private readonly PasswordHasher <object>_passwordHasher;
    
    public PasswordHasherService()
    {
        _passwordHasher = new PasswordHasher<object>();
    }
    public string HashPassword(string password)
    {
        return _passwordHasher.HashPassword(null, password);
    }

    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
        return result == PasswordVerificationResult.Success;
    }
}