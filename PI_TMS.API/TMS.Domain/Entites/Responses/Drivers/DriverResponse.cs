using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Enums;

namespace TMS.Domain.Entites.Responses.Drivers
{
    public class DriverResponse
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DriverLicensesCategory DriverLicensesCategory { get; set; }
    }
}
