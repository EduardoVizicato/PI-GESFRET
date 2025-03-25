using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.SeedWork;

namespace TMS.Domain.Aggregates
{
    public class User : BaseEntity
    {
        string FirstName;
        string LastName;
        string Email;
        string Password;
        
    }
}
