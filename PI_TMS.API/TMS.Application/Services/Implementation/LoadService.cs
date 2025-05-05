using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites.Requests.Load;
using TMS.Domain.Entites.Responses.Load;
using TMS.Domain.Entities;

namespace TMS.Application.Services.Implementation;

public class LoadService : ILoadService
{
    public Task<List<Load>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Load> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<LoadRequest> AddAsync(LoadRequest load)
    {
        throw new NotImplementedException();
    }

    public Task<bool?> UpdatesAsync(Guid id, LoadResponse load)
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