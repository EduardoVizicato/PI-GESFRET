using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Enums;

namespace TMS.Domain.Entites
{
    public class Driver : BaseEntity
    {
        public Driver(string firstName, string lastName, DriverLicensesCategory driverLicensesCategory)
        {
            FirstName = firstName;
            LastName = lastName;
            DriverLicensesCategory = driverLicensesCategory;
        }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public DriverLicensesCategory DriverLicensesCategory { get; private set; }

        public void UpdateDriver(string firstName, string lastName, DriverLicensesCategory driverLicensesCategory)
        {
            FirstName = firstName;
            LastName = lastName;
            DriverLicensesCategory = driverLicensesCategory;
        }
    }
}
