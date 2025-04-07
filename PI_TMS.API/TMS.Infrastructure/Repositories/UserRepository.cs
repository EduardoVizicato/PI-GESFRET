using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Data;

namespace TMS.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDataContext _context;
        private readonly ILogger<UserRepository> _logger;
        public UserRepository(ApplicationDataContext context, ILogger<UserRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<RegisterUserRequest> AddAsync(RegisterUserRequest user)
        {
            throw new NotImplementedException();
        }

        public Task<bool?> DesactiveUserAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> GetAllAsync()
        {
            _logger.LogInformation("Getting all users");
            return _context.Users.ToList();
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            if (id == null)
            {
                _logger.LogError($"user with {id} not found");
                return null;
            }
            return await _context.Users.FindAsync(id);
        }

        public Task<bool?> UpdatesUserAsync(RegisterUserRequest user)
        {
            throw new NotImplementedException();
        }
    }
}
