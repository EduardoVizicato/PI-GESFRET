using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entities;

namespace TMS.Domain.Entites.Requests.Client
{
    public class ClientRequest
    {
        public string Name { get; set; }
        public string IdentificationNumber { get; set; }
        public Adress Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
