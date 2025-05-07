using Microsoft.AspNetCore.Http.HttpResults;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Travel;
using TMS.Domain.Entites.Responses.Travel;
using TMS.Domain.Repositories;

namespace TMS.Application.Services.Implementation;

public class TravelService : ITravelService
{
    private readonly  ITravelRepository _travelRepository;
    public TravelService(ITravelRepository travelRepository)
    {
        _travelRepository = travelRepository;   
    }

    public async Task<List<Travel>> GetAllAsync()
    {
        var getAllTravels = await _travelRepository.GetAllAsync();
        if (getAllTravels == null)
        {
            return null;
        }

        return getAllTravels;
    }

    public async Task<Travel> GetByIdAsync(Guid id)
    {
        var travelById = await _travelRepository.GetByIdAsync(id);
        if(travelById == null)
        {
            return null;
        }

        return travelById;
    }

    public async Task<TravelRequest> AddAsync(TravelRequest travel)
    {
       var addTravel = await _travelRepository.AddAsync(travel);
       
        return addTravel;
    }

    public Task<bool?> UpdatesAsync(Guid id, TravelResponse travel)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> ChangeStatusAsync(Guid id)
    {
        var checkId = await _travelRepository.GetByIdAsync(id);
        if(checkId == null)
        {
            return false;
        }
        var changeTravelStatus = await _travelRepository.ChangeStatusAsync(id);

        return changeTravelStatus;
    }

    public async Task<bool> CancelTravel(Guid id)
    {
        var cancelTravel = await _travelRepository.CancelTravel(id);

        if(id == null)
        {
            return false;
        }
        return cancelTravel;
    }
}