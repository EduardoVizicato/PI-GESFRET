using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Enums;

namespace TMS.Domain.Entites
{
    public class Vehicle : BaseEntity
    {
        [NotNull]
        public string Name { get; set; }
        [NotNull]
        public string VehicleRegistrationPlate { get; set; }
        [NotNull]
        public VehicleType VehicleType { get; set; }
        [NotNull]
        public bool IsActive { get; set; }
    }
}
