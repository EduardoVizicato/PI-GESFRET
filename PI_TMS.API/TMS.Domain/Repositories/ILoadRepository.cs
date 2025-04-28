using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Load;
using TMS.Domain.Entites.Responses.Load;
using TMS.Domain.Entities;

namespace TMS.Domain.Repositories;

public interface ILoadRepository
{
    Task<List<Load>> GetAllAsync();
    Task<Load> GetByIdAsync(Guid id);
    Task<Load> GetByEmail(string email);
    Task<LoadRequest> AddAsync(LoadRequest load);
    Task<bool?> UpdatesAsync(Guid id, LoadResponse load);
    Task<bool?> DesactiveAsync(Guid id);
    Task<List<Load>> GetAllActived();
    Task<List<Load>> GetAllDesactived();
}