using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Vehicle;
using TMS.Domain.Entites.Responses.Vehicle;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Data;

namespace TMS.Infrastructure.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly ApplicationDataContext _context;
    private readonly ILogger<VehicleRepository> _logger;

    public VehicleRepository(ApplicationDataContext context, ILogger<VehicleRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<Vehicle>> GetAllVehiclesAsync()
    {
        _logger.LogInformation($"Carregando todos os veículos");
        return await _context.Vehicles.ToListAsync();
    }

    public async Task<Vehicle> GetVehicleByIdAsync(Guid id)
    {
        var vehicleById = await _context.Vehicles.FindAsync(id);
        if (vehicleById == null)
        {
            _logger.LogError($"Veículo de Id: {id} não foi encontrado ");
        }

        _logger.LogInformation($"Veículo de Id: {id} encontrado");
        return vehicleById;
    }

    public async Task<VehicleRequest> AddVehicleAsync(VehicleRequest vehicle)
    {
        var addVehicle = new Vehicle(vehicle.Name, vehicle.VehicleRegistrationPlate, vehicle.VehicleType);
        
        if (addVehicle.Name == null || addVehicle.VehicleRegistrationPlate == null || addVehicle.VehicleType == null)
        {
            _logger.LogWarning("Preencha todos os campos");
        }

        _context.Vehicles.Add(addVehicle);
        await _context.SaveChangesAsync();
        return vehicle;
    }

    public async Task<bool?> UpdateVehicleAsync(Guid id, VehicleResponse vehicle)
    {
        var vehicleToUpdate = await _context.Vehicles.FindAsync(id);
        if (vehicleToUpdate == null)
        {
            _logger.LogError($"veículo de Id: {id} não encontrado");
        }

        vehicleToUpdate.UpdateVehicle(vehicle.Name, vehicle.VehicleRegistrationPlate, vehicle.VehicleType);
        
        _context.Vehicles.Update(vehicleToUpdate);
        _context.SaveChanges();
        return true;
    }

    public async Task<bool?> DesactiveVehicleAsync(Guid id)
    {
        var desactiveVehicle = await _context.Vehicles.FindAsync(id);
        if (desactiveVehicle == null)
        {
            _logger.LogWarning($"Veículo de Id: {id} não foi encontrado");
            return false;
        }

        desactiveVehicle.IsActive = false;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<Vehicle>> GetAllDesactivedVehicles()
    {
        return await _context.Vehicles.Where(x => x.IsActive == true).ToListAsync();
    }

    public async Task<List<Vehicle>> GetAllDesactivedVehciles()
    {
        return await _context.Vehicles.Where(x => x.IsActive == true).ToListAsync();
    }
}