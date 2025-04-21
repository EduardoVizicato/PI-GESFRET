using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Contracts.Authentication;
using TMS.Domain.Entites.Requests.User;

namespace TMS.Application.Services.Implementation
{
    public class LoginRequestService : ILoginRequestService
    {
        public Task<LoginUserRequest> Login(LoginUserRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
