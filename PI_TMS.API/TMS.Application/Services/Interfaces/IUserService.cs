using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entites.Responses.User;
using TMS.Domain.Entities;

namespace TMS.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<RegisterUserRequest> RegisterUser(RegisterUserRequest request);
        Task<bool?> DesactiveUser(Guid id);
        Task<bool?> UpdateUser(Guid id, RegisterUserResponse request);
        Task<List<User>> ListAllUsers();
        Task<User> GetUserById(Guid id);
        Task<User> GetUserByEmail(string email);
        Task<List<User>> ListAllActivedUsers();
        Task<List<User>> ListAllDesactivedUsers();
    }
}
