using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Driver;
using TMS.Domain.Entites.Responses.Drivers;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Data;

namespace TMS.Infrastructure.Repositories;

public class DriverRepository : IDriverRepository
{
    private readonly ApplicationDataContext _context;
    private readonly ILogger<DriverRepository> _logger;
    public DriverRepository(ApplicationDataContext context, ILogger<DriverRepository> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task<List<Driver>> GetAllDriversAsync()
    {
        _logger.LogInformation("Carregando todos os motoristas");
        return await _context.Drivers.ToListAsync();
    }

    public async Task<Driver> GetDriverByIdAsync(Guid id)
    {
        if (id == null)
        {
            _logger.LogError($"Motorista de Id : {id} não encontrado");
        }
        _logger.LogInformation($"Usário de id: {id} encontrado");
        var getDriverbyId = _context.Drivers.Find(id);
        return getDriverbyId;
    }

    public async Task<RegisterDriverRequest> AddDriverAsync(RegisterDriverRequest driver)
    {
        var addDriver = new Driver(driver.FirstName, driver.LastName, driver.DriverLicensesCategory);

        if (addDriver.DriverLicensesCategory == null || addDriver.FirstName == null || addDriver.LastName == null)
        {
            _logger.LogWarning("Preencha todos os campos");
        }
        _context.Drivers.Add(addDriver);
        await _context.SaveChangesAsync();
        return driver;
    }

    public async Task<bool?> UpdateDriverAsync(Guid id, DriverResponse driver)
    {
        var updateDriver = _context.Drivers.Find(id);
        if (updateDriver == null)
        {
            _logger.LogError($"Motorista de Id: {id} não encontrado");
        }

        updateDriver.UpdateDriver(updateDriver.FirstName, updateDriver.LastName, updateDriver.DriverLicensesCategory);
        
        _context.Drivers.Update(updateDriver);
        await _context.SaveChangesAsync();
        _logger.LogInformation($"Motorista de Id: {id} atualizado com sucesso");
        return true;
    }

    public async  Task<bool?> DesactiveDriverAsync(Guid id)
    {
        var desactiveDriver = _context.Drivers.Find(id);
        if (desactiveDriver == null)
        {
            _logger.LogError($"Motorista de Id: {id} não encontrado");
        }
        desactiveDriver.IsActive = false;
        await _context.SaveChangesAsync();
        _logger.LogInformation($"Motorista de Id: {id} desativado com sucesso");
        return true;
    }

    public async Task<List<Driver>> GetAllActivedDrivers()
    {
        return await _context.Drivers.Where(x => x.IsActive == true).ToListAsync();
    }

    public async Task<List<Driver>> GetAllDesactivedDrivers()
    {
        return await _context.Drivers.Where(x => x.IsActive == false).ToListAsync();
    }
}