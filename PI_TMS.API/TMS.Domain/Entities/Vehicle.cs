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
        public Vehicle(string name, string vehicleRegistrationPlate, VehicleType vehicleType)
        {
            Name = name;
            VehicleRegistrationPlate = vehicleRegistrationPlate;
            VehicleType = vehicleType;
        }
        public string Name { get; private set; }
        public string VehicleRegistrationPlate { get; private set; }
        public VehicleType VehicleType { get; private set; }

        public void UpdateVehicle(string name, string vehicleRegistrationPlate, VehicleType vehicleType)
        {
            Name = name;
            VehicleRegistrationPlate = vehicleRegistrationPlate;
            VehicleType = vehicleType;
        }
    }
}
