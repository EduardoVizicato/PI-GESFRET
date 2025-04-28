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

    public async Task<Load> GetByEmail(string email)
    {
        return await _context.Loads.FindAsync(email);
    }

    public async Task<LoadRequest> AddAsync(LoadRequest load)
    {
        throw new Exception();
    }

    public async Task<bool?> UpdatesAsync(Guid id, LoadResponse load)
    {
        throw new Exception();
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