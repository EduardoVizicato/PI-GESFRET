using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Domain.Entites
{
    public class Truck : BaseEntity
    {
        public string Name { get; set; }

        public string VehicleRegistrationPlate { get; set; }
    }
}
