using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Vehicle;
using TMS.Domain.Entites.Responses.Vehicle;
using TMS.Domain.Repositories;

namespace TMS.Application.Services.Implementation
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehcileRepository;
        private readonly ILogger<VehicleService> _logger;
        public VehicleService(IVehicleRepository vehcileRepository, ILogger<VehicleService> logger)
        {
            _vehcileRepository = vehcileRepository;
            _logger = logger;

        }
        public async Task<VehicleRequest> RegisterVehicleAsync(VehicleRequest vehicle)
        {
            var registerVehicle = await _vehcileRepository.AddVehicleAsync(vehicle);
            return registerVehicle;
        }

        public async Task<bool?> DesactiveVehicleAsync(Guid id)
        {
            var desactivevehicle = await _vehcileRepository.DesactiveVehicleAsync(id);
            return desactivevehicle;
        }

        public async Task<Vehicle> GetVehicleByIdAsync(Guid id)
        {
           var getVehicleById = await _vehcileRepository.GetVehicleByIdAsync(id);
            return getVehicleById;
        }

        public Task<List<Vehicle>> ListAllVehiclesAsync()
        {
            return _vehcileRepository.GetAllVehiclesAsync();
        }

        public async Task<bool?> UpdateVehicleAsync(Guid id, VehicleResponse vehicle)
        {
            var updateVehicle = await _vehcileRepository.UpdateVehicleAsync(id, vehicle);
            return updateVehicle;
        }

        public async Task<List<Vehicle>> ListAllActivedVehicles()
        {
           return await _vehcileRepository.GetAllDesactivedVehicles();
        }

        public async Task<List<Vehicle>> ListAllDesactivedVehicles()
        {
            return await _vehcileRepository.GetAllDesactivedVehicles();
        }
    }
}
