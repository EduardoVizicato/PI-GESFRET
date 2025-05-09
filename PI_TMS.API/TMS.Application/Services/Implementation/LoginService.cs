using TMS.Application.Services.Interfaces;
using TMS.Domain.ValueObjects;
using TMS.Service.Common.Application.Authentication;

namespace TMS.Application.Services.Implementation;

public class LoginService : ILoginService
{
    private readonly IUserService _userService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator ;
    public LoginService(IUserService userService, IJwtTokenGenerator jwtTokenGenerator)
    {
        _userService = userService;
        _jwtTokenGenerator = jwtTokenGenerator;
    }
    
    public async Task<string> LoginAsync(EmailVO email, PasswordVO password)
    {
        var user = await _userService.ValidateUser(email, password);
        
        if (user == null)
        {
            return null;
        }

        return _jwtTokenGenerator.GenerateToken(user);

    }
}