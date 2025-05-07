using Microsoft.Extensions.Logging;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites.Requests.Load;
using TMS.Domain.Entites.Responses.Load;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;

namespace TMS.Application.Services.Implementation;

public class LoadService : ILoadService
{
    private readonly ILoadRepository _loadRepository;
    private readonly ILogger<LoadService> _logger;

    public LoadService(ILoadRepository loadRepository, ILogger<LoadService> logger)
    {
        _loadRepository = loadRepository;
        _logger = logger;
    }

    public async Task<List<Load>> GetAllAsync()
    {
        var getAllLoads = await _loadRepository.GetAllAsync();
        if (getAllLoads == null)
        {
            return null;
        }
        return getAllLoads;
    }

    public Task<Load> GetByIdAsync(Guid id)
    {
        var getLoadById = _loadRepository.GetByIdAsync(id);
        if(getLoadById == null)
        {
            return null;
        }
        return getLoadById;
    }

    public async Task<LoadRequest> AddAsync(LoadRequest load)
    {
        var addLoad = await _loadRepository.AddAsync(load);
        //Lógica será adicionada depois 
        return addLoad;
    }

    public Task<bool?> UpdatesAsync(Guid id, LoadResponse load)
    {
        throw new NotImplementedException();
    }

    public async Task<bool?> DesactiveAsync(Guid id)
    {
        var checkId = await _loadRepository.GetByIdAsync(id);
       
        if (checkId == null)
        {
            _logger.LogError("The user was not found");
        }

        return await _loadRepository.DesactiveAsync(id);
    }

    public async Task<List<Load>> GetAllActived()
    {
        var getAllActivedLoads = await _loadRepository.GetAllActived();
        if(getAllActivedLoads == null)
        {
            _logger.LogError("There is no Actived Loads");
        }

        return getAllActivedLoads;
    }

    public async Task<List<Load>> GetAllDesactived()
    {
        var getAllDesactivedLoads = await _loadRepository.GetAllDesactived();
        if (getAllDesactivedLoads == null)
        {
            _logger.LogError("There is no Desactived Loads");
        }

        return getAllDesactivedLoads;
    }
}