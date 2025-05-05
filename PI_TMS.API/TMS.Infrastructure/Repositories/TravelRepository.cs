using Microsoft.EntityFrameworkCore;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Travel;
using TMS.Domain.Entites.Responses.Travel;
using TMS.Domain.Entities.Enums;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Data;

namespace TMS.Infrastructure.Repositories;

public class TravelRepository : ITravelRepository
{
    private readonly ApplicationDataContext _context;
    public TravelRepository(ApplicationDataContext context)
    {
        _context = context;
    }
    public async Task<List<Travel>> GetAllAsync()
    {
        return await _context.Travels.ToListAsync();
    }

    public async Task<Travel> GetByIdAsync(Guid id)
    {
        return await _context.Travels.FindAsync(id);
    }

    public async Task<TravelRequest> AddAsync(TravelRequest travel)
    {
        var addTravel = new Travel(
            travel.TravelName,
            travel.StartDate,
            travel.EndDate,
            travel.DepartureLocationId,
            travel.DepartureLocation,
            travel.ArrivalLocationId,
            travel.ArrivalLocation,
            travel.Weight,
            travel.Price,
            travel.Description,
            travel.LoadId,
            travel.Load
            );
        _context.Travels.Add(addTravel);
        await _context.SaveChangesAsync();
        return travel;
    }

    public async Task<bool?> UpdatesAsync(Guid id, TravelResponse travel)
    {
        throw new Exception();
    }

    public async Task<bool> ChangeStatusAsync(Guid id)
    {
        var changeStatus = await _context.Travels.FindAsync(id);
        changeStatus.AdvanceStatus();
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> CancelTravel(Guid id)
    {
        var checkStatus = await _context.Travels.FindAsync(id);
        checkStatus.CancelTravel();
        return await _context.SaveChangesAsync() > 0;
    }
}