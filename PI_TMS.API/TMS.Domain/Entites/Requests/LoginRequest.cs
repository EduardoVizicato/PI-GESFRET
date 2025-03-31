using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.Entites.Requests
{
    public record LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
