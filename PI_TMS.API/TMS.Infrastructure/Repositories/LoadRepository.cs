using TMS.Domain.Entites.Requests.Load;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;

namespace TMS.Infrastructure.Repositories;

public class LoadRepository: ILoadRepository
{
    public Task<List<Load>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Load> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Load> GetByEmail(string email)
    {
        throw new NotImplementedException();
    }

    public Task<LoadRequest> AddAsync(LoadRequest user)
    {
        throw new NotImplementedException();
    }

    public Task<bool?> UpdatesAsync(Guid id, LoadRequest user)
    {
        throw new NotImplementedException();
    }

    public Task<bool?> DesactiveAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<List<Load>> GetAllActived()
    {
        throw new NotImplementedException();
    }

    public Task<List<Load>> GetAllDesactived()
    {
        throw new NotImplementedException();
    }
}