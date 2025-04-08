using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entites.Responses.User;
using TMS.Domain.Entities;

namespace TMS.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(Guid id);
        Task<RegisterUserRequest> AddAsync(RegisterUserRequest user);
        Task<bool?> UpdatesUserAsync(Guid id,RegisterUserResponse user);
        Task<bool?> DesactiveUserAsync(Guid id);

    }
}
