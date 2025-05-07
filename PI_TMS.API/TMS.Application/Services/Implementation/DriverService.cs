using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Driver;
using TMS.Domain.Entites.Responses.Drivers;
using TMS.Domain.Repositories;

namespace TMS.Application.Services.Implementation
{
    public class DriverService : IDriverService
    {
        private readonly IDriverRepository _driverRepository;
        private readonly ILogger<DriverService> _logger;

        public DriverService(IDriverRepository driverRepository, ILogger<DriverService> logger)
        {
            _driverRepository = driverRepository;
            _logger = logger;
        }

        public async Task<RegisterDriverRequest> RegisterDriverAsync(RegisterDriverRequest driver)
        {
            var registerDriver = await _driverRepository.AddDriverAsync(driver);
            return registerDriver;
        }

        public async Task<bool?> DesactiveDriverAsync(Guid id)
        {
            var desactiveDriver = await _driverRepository.DesactiveDriverAsync(id);
            return desactiveDriver;
        }

        public async Task<Driver> GetDriverByIdAsync(Guid id)
        {
            var getDriverById = await _driverRepository.GetDriverByIdAsync(id);
            return getDriverById;
        }

        public async Task<List<Driver>> ListAllDriversAsync()
        {
            return await _driverRepository.GetAllDriversAsync();
        }

        public async Task<bool?> UpdateDriverAsync(Guid id, DriverResponse driver)
        {
            var updateDriver = await _driverRepository.UpdateDriverAsync(id, driver);
            return updateDriver;
        }

        public async Task<List<Driver>> ListAllActivedDrivers()
        {
            return await _driverRepository.GetAllActivedDrivers();
        }

        public async Task<List<Driver>> ListAllDesactivedDrivers()
        {
            return await _driverRepository.GetAllDesactivedDrivers();
        }
    }
}
