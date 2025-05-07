using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entites.Responses.User;
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

        public async Task<bool?> DesactiveUserAsync(Guid id)
        {
            var userToDesactive = await _context.Users.FindAsync(id);
            userToDesactive.IsActive = false;
            await _context.SaveChangesAsync();
            _logger.LogError($"Usuário de Id {id} desativado com sucesso");
            return true;
        }

        public async Task<List<User>> GetAllActivedUsers()
        {
            return await _context.Users.Where(x => x.IsActive == true).ToListAsync();
        }

        public async Task<List<User>> GetAllAsync()
        {
            _logger.LogInformation("Carregando todos os usuários");
            return await _context.Users.ToListAsync();
        }

        public async Task<List<User>> GetAllDesactivedUsers()
        {
            return await _context.Users.Where(x => x.IsActive == false).ToListAsync();
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            var userById = await _context.Users.FindAsync(id);
            if (id == null)
            {
                _logger.LogError($"usuário de id: {id} não encontrado");
                return null;
            }
            _logger.LogInformation($"Usário de id: {id} encontrado");
            return userById;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var userByEmail = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            _logger.LogInformation($"Usuário encontrado");
            return userByEmail;
        }

        public async Task<User> AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool?>  UpdatesUserAsync(Guid id, RegisterUserResponse user)
        {
            var userToUpdate = await _context.Users.FindAsync(id);
            
            userToUpdate.UpdateUser(user.FirstName, user.LastName, user.Email, user.IdentificationNumber, user.PhoneNumber);
            _context.Users.Update(userToUpdate);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Usuário de id: {id} atualizado com sucesso");
            return true;
        }
    }
}
