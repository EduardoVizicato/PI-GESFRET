using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Requests.User
{
    public record RegisterUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public EmailVO Email { get; set; }
        public PasswordVO Password { get; set; }
        public PhoneVO PhoneNumber { get; set; }
        public TaxIdVO TaxId { get; set; }
    }
}
