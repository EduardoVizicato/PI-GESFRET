using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Travel;
using TMS.Domain.Entites.Responses.Travel;

namespace TMS.Application.Services.Interfaces;

public interface ITravelService
{
    Task<List<Travel>> GetAllAsync();
    Task<Travel> GetByIdAsync(Guid id);
    Task<TravelRequest> AddAsync(TravelRequest travel);
    Task<bool?> UpdatesAsync(Guid id,TravelResponse travel);
    Task<bool> ChangeStatusAsync(Guid id);
    Task<bool> CancelTravel(Guid id);
}