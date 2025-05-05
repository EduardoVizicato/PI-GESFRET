using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Travel;
using TMS.Domain.Entites.Responses.Travel;

namespace TMS.Application.Services.Implementation;

public class TravelService : ITravelService
{
    public Task<List<Travel>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Travel> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<TravelRequest> AddAsync(TravelRequest travel)
    {
        throw new NotImplementedException();
    }

    public Task<bool?> UpdatesAsync(Guid id, TravelResponse travel)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ChangeStatusAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> CancelTravel(Guid id)
    {
        throw new NotImplementedException();
    }
}