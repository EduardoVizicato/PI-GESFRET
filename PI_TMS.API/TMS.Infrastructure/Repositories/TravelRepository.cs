using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Travel;
using TMS.Domain.Entites.Responses.Travel;
using TMS.Domain.Repositories;

namespace TMS.Infrastructure.Repositories;

public class TravelRepository : ITravelRepository
{
    public Task<List<Travel>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Travel> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Travel> GetByEmail(string email)
    {
        throw new NotImplementedException();
    }

    public Task<TravelRequest> AddAsync(TravelRequest user)
    {
        throw new NotImplementedException();
    }

    public Task<bool?> UpdatesAsync(Guid id, TravelResponse user)
    {
        throw new NotImplementedException();
    }

    public Task<bool?> DesactiveAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<List<Travel>> GetAllActived()
    {
        throw new NotImplementedException();
    }

    public Task<List<Travel>> GetAllDesactived()
    {
        throw new NotImplementedException();
    }
}