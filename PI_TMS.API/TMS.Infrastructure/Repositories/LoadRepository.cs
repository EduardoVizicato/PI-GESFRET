using Microsoft.EntityFrameworkCore;
using TMS.Domain.Entites.Requests.Load;
using TMS.Domain.Entites.Responses.Load;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Data;

namespace TMS.Infrastructure.Repositories;

public class LoadRepository: ILoadRepository
{
    private readonly ApplicationDataContext _context;
    public LoadRepository(ApplicationDataContext context)
    {
        _context = context;
    }
    public async Task<List<Load>> GetAllAsync()
    {
        return await _context.Loads.ToListAsync();
    }

    public async Task<Load> GetByIdAsync(Guid id)
    {
        return  await _context.Loads.FindAsync(id);
    }

    public async Task<LoadRequest> AddAsync(LoadRequest load)
    {
        var addLoad = new Load(load.Description, load.Quantity, load.Type);
        _context.Loads.Add(addLoad);
        await _context.SaveChangesAsync();
        return load;
    }

    public async Task<bool?> UpdatesAsync(Guid id, LoadResponse load)
    {
        var updateLoad = await _context.Loads.FindAsync(id);
        updateLoad.Updateload(load.Description, load.Quantity, load.Type);
        _context.Loads.Update(updateLoad);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool?> DesactiveAsync(Guid id)
    {
        var checkId = await _context.Loads.FindAsync(id);
        checkId.IsActive = false;
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<List<Load>> GetAllActived()
    {
        return await _context.Loads.Where(x => x.IsActive == true).ToListAsync();
    }

    public async Task<List<Load>> GetAllDesactived()
    {
        return await _context.Loads.Where(x => x.IsActive == false).ToListAsync();
    }
}