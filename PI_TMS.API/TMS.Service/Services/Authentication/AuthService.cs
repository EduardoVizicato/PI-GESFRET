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
            var user = new AuthResult
            {
                Id = Guid.NewGuid(),
                FirstName = "FirstName", 
                LastName = "LastName",   
                Email = email,
                Password = password,     
                Token = "GeneratedToken"
            };

            return user;
        }

        public AuthResult Register(string firstname, string lastname, string email, string password)
        {
            return new AuthResult
            {
                Id = Guid.NewGuid(),
                FirstName = firstname,
                LastName = lastname,
                Email = email,
                Password = password,
                Token = "GeneratedToken"
            };
        }
    }
}
