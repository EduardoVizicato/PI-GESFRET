using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Service.Services.Authentication
{
    public class AuthService : IAuthService
    {
        public AuthResult Login(string email, string password)
        {
            return new AuthResult
            {
            };
        }

        public AuthResult Register(string firstname, string lastname, string email, string password)
        {
            return new AuthResult
            {
            };
        }
    }
}
