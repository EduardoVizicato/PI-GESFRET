using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.Vehicle;
using TMS.Domain.Entites.Responses.Vehicle;
using TMS.Domain.Entites;
using TMS.Domain.Entities;

namespace TMS.Application.Services.Interfaces
{
    public interface IVehicleService
    {
        Task<List<Vehicle>> ListAllVehiclesAsync();
        Task<Vehicle> GetVehicleByIdAsync(Guid id);
        Task<VehicleRequest> RegisterVehicleAsync(VehicleRequest vehicle);
        Task<bool?> UpdateVehicleAsync(Guid id, VehicleResponse vehicle);
        Task<bool?> DesactiveVehicleAsync(Guid id);
        Task<List<Vehicle>> ListAllActivedVehicles();
        Task<List<Vehicle>> ListAllDesactivedVehicles();
    }
}
