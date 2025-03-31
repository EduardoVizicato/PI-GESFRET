using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Enums;

namespace TMS.Domain.Entites
{
    public class Driver : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public DriverLicensesCategory DriverLicensesCategory { get; set; }
    }
}
