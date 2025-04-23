using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Client;
using TMS.Domain.Entites.Responses.Client;

namespace TMS.Domain.Repositories;

public interface IClientRepository
{
    Task<List<Client>> GetAllAsync();
    Task<Client> GetByIdAsync(Guid id);
    Task<Client> GetByEmail(string email);
    Task<ClientRequest> AddAsync(ClientRequest user);
    Task<bool?> UpdatesAsync(Guid id,ClientResponse user);
    Task<bool?> DesactiveAsync(Guid id);
    Task<List<Client>> GetAllActived();
    Task<List<Client>> GetAllDesactived();
}