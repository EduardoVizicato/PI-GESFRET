using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Driver;
using TMS.Domain.Entites.Responses.Drivers;
using TMS.Domain.Entities;

namespace TMS.Domain.Repositories;

public interface IDriverRepository
{
    Task<List<Driver>> GetAllDriversAsync();
    Task<Driver> GetDriverByIdAsync(Guid id);
    Task<RegisterDriverRequest> AddDriverAsync(RegisterDriverRequest driver);
    Task<bool?> UpdateDriverAsync(Guid id,DriverResponse driver);
    Task<bool?> DesactiveDriverAsync(Guid id);
    Task<List<Driver>> GetAllActivedDrivers();
    Task<List<Driver>> GetAllDesactivedDrivers();

}