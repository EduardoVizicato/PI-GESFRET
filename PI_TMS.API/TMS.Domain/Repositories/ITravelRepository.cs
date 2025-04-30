using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Travel;
using TMS.Domain.Entites.Responses.Travel;

namespace TMS.Domain.Repositories;

public interface ITravelRepository
{
    Task<List<Travel>> GetAllAsync();
    Task<Travel> GetByIdAsync(Guid id);
    Task<TravelRequest> AddAsync(TravelRequest travel);
    Task<bool?> UpdatesAsync(Guid id,TravelResponse travel);
}