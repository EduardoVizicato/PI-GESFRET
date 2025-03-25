using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Service.Services.Authentication
{
    public interface IAuthService
    {
        AuthResult Login(string email, string password);
        AuthResult Register(string firstname, string lastname, string email, string password);
    }
}
