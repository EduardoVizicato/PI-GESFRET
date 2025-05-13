using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Responses.User
{
    public class RegisterUserResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public EmailVO Email { get; set; }
        public TaxIdVO TaxId{ get;  set; }
        public PhoneVO PhoneNumber { get;  set; }
    }
}
