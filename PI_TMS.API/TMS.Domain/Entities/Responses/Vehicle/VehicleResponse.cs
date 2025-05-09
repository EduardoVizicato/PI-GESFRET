using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Enums;
using TMS.Domain.ValueObjects;

namespace TMS.Domain.Entites.Responses.Vehicle
{
    public class VehicleResponse
    {
        public string Name { get; set; }
        public VehicleRegistrationPlateVO VehicleRegistrationPlate { get; set; }
        public VehicleType VehicleType { get; set; }
    }
}
