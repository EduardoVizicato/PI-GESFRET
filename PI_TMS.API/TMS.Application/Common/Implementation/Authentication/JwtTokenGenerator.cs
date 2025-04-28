using TMS.Domain.Entities;
using TMS.Service.Common.Application.Authentication;

namespace TMS.Application.Common.Implementation.Authentication;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    public string GenerateToken(User user)
    {
        throw new NotImplementedException();
    }
}