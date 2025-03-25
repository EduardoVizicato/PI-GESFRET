using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Contracts.Authentication
{
    public record RegisterRequest
    {
        string FirstName;
        string Lastname;
        string Email;
        string Password;
    }
}
