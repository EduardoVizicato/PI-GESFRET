using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public async Task<User> AddAsync(User user)
        {
            await _context.AddAsync(user);
            _logger.LogInformation($"user generated sucefully with Id {user.Id}");
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while saving user with Id {user.Id}");
            }
            return user;
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

        public async Task<bool?> UpdateAsync(User user)
        {
            var userToUpdate = await GetByIdAsync(user.Id);
            if (userToUpdate == null)
            {
                _logger.LogError($"user with {user.Id} not found");
                return null;
            }
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            userToUpdate.Password = user.Password;

            _context.Users.Update(userToUpdate);
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred while updating user with Id {user.Id}");
                return false;
            }
        }
    }
}
