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
            if (string.IsNullOrEmpty(user.FirstName) || string.IsNullOrEmpty(user.LastName) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                _logger.LogWarning("Adicione valor a todos os campos");
                return null;
            }
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
            if (userToDesactive == null)
            {
                _logger.LogError($"Usuário de Id {id} não encontrado");
            }

            userToDesactive.IsActive = false;
            await _context.SaveChangesAsync();
            _logger.LogError($"Usuário de Id {id} desativado com sucesso");
            return true;
        }

        public async Task<List<User>> GetAllAsync()
        {
            _logger.LogInformation("Carregando todos os usuários");
            return await _context.Users.ToListAsync();
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

        public async Task<RegisterUserResponse> GetUserByEmail(string email)
        {
            var userByEmail = await _context.Users.FindAsync(email);
            if (userByEmail == null) 
            {
                _logger.LogError($"Usuário de email: {email} não encontrado");
                return null;
            }
            _logger.LogInformation($"Usuário encontrado");
            return userByEmail;
        }

        public async Task<bool?>  UpdatesUserAsync(Guid id, RegisterUserResponse user)
        {
            var userToUpdate = await _context.Users.FindAsync(id);
            if (userToUpdate == null)
            {
                _logger.LogError($"Usuário de id: {id} nao encontrado");
                return null;
            }

           userToUpdate.FirstName = user.FirstName;
           userToUpdate.LastName = user.LastName;
           userToUpdate.Email = user.Email;

            await _context.SaveChangesAsync();
            _logger.LogInformation($"Usuário de id: {id} atualizado com sucesso");
            return true;
        }
    }
}
