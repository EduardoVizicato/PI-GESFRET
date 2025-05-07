using TMS.Domain.Entites.Requests.Load;
using TMS.Domain.Entites.Responses.Load;
using TMS.Domain.Entities;

namespace TMS.Application.Services.Interfaces;

public interface ILoadService
{
    Task<List<Load>> GetAllAsync();
    Task<Load> GetByIdAsync(Guid id);
    Task<LoadRequest> AddAsync(LoadRequest load);
    Task<bool?> UpdatesAsync(Guid id, LoadResponse load);
    Task<bool?> DesactiveAsync(Guid id);
    Task<List<Load>> GetAllActived();
    Task<List<Load>> GetAllDesactived();
}