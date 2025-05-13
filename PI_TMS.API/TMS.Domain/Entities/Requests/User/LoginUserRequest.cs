using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Requests.User
{
    public record LoginUserRequest
    {
        public EmailVO Email { get; set; }
        public PasswordVO Password { get; set; }
    }
}
