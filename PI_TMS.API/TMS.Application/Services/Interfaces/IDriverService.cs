using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.Driver;
using TMS.Domain.Entites.Responses.Drivers;
using TMS.Domain.Entites;
using TMS.Domain.Entities;

namespace TMS.Application.Services.Interfaces
{
    public interface IDriverService
    {
        Task<List<Driver>> ListAllDriversAsync();
        Task<Driver> GetDriverByIdAsync(Guid id);
        Task<RegisterDriverRequest> RegisterDriverAsync(RegisterDriverRequest driver);
        Task<bool?> UpdateDriverAsync(Guid id, DriverResponse driver);
        Task<bool?> DesactiveDriverAsync(Guid id);
        Task<List<Driver>> ListAllActivedDrivers();
        Task<List<Driver>> ListAllDesactivedDrivers();
    }
}
