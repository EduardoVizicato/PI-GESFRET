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

        public async Task<RegisterUserRequest> AddAsync(RegisterUserRequest user)
        {
            var addUser = new User()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Password = user.Password,
                    IsActive = true
                };
                
                _context.Users.Add(addUser);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Usuário adicionado com sucesso");
            return user;
        }

        public async Task<bool?> DesactiveUserAsync(Guid id)
        {
            var userToDesactive = await _context.Users.FindAsync(id);
            userToDesactive.IsActive = false;

            await _context.SaveChangesAsync();
            _logger.LogError($"Usuário de Id {id} desativado com sucesso");
            return true;
        }

        public async Task<List<User>> GetAllActivedUser()
        {
            return await _context.Users.Where(x => x.IsActive == true).ToListAsync(); 
        }

        public async Task<List<User>> GetAllAsync()
        {
            _logger.LogInformation("Carregando todos os usuários");
            return await _context.Users.ToListAsync();
        }

        public async Task<List<User>> GetAllDesactivedUser()
        {
            return await _context.Users.Where(x => x.IsActive == false).ToListAsync();
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            var userById = await _context.Users.FindAsync(id);
            _logger.LogInformation($"Usário de id: {id} encontrado");
            return userById;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var userEmail = await _context.Users.FindAsync(email);
            return userEmail;
        }

        public async Task<bool?>  UpdatesUserAsync(Guid id, RegisterUserResponse user)
        {
           var userToUpdate = await _context.Users.FindAsync(id);
           userToUpdate.FirstName = user.FirstName;
           userToUpdate.LastName = user.LastName;
           userToUpdate.Email = user.Email;

            await _context.SaveChangesAsync();
            _logger.LogInformation($"Usuário de id: {id} atualizado com sucesso");
            return true;
        }
    }
}
