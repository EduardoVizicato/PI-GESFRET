using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entites.Responses.User;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;

namespace TMS.Application.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserService> _logger;
        public UserService(IUserRepository userRepository, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _logger = logger;

        }
        public Task<bool?> DesactiveUser(Guid id)
        {
            var desactiveUser = _userRepository.DesactiveUserAsync(id);
            return desactiveUser;
        }

        public Task<User> GetUserByEmail(string email)
        {
            var getUserByEmail = _userRepository.GetUserByEmail(email);
            if (getUserByEmail == null)
            {
                _logger.LogWarning("The Id is null");
                return null;
            }
            return getUserByEmail;
        }

        public Task<User> GetUserById(Guid id)
        {
            var getUserById = _userRepository.GetByIdAsync(id);
            if (getUserById == null)
            {
                return null;
            }
            return getUserById;
        }

        public Task<List<User>> ListAllActivedUsers()
        {
            var getAllActivedUsers = _userRepository.GetAllActivedUsers();
            return getAllActivedUsers;
        }

        public Task<List<User>> ListAllDesactivedUsers()
        {
            var listAllDesactivedUsers = _userRepository.GetAllDesactivedUsers();
            return listAllDesactivedUsers;
        }

        public Task<List<User>> ListAllUsers()
        {
            var listAllUsers = _userRepository.GetAllAsync();
            return listAllUsers;
        }

        public Task<RegisterUserRequest> RegisterUser(RegisterUserRequest request)
        {
            if (string.IsNullOrEmpty(request.FirstName) || string.IsNullOrEmpty(request.LastName) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                _logger.LogInformation("Add a value to all fields");
            }
            var registerUser = _userRepository.AddAsync(request);
            return registerUser;
        }

        public Task<bool?> UpdateUser(Guid id, RegisterUserResponse request)
        {
            var updateUser = _userRepository.UpdatesUserAsync(id, request);

            return updateUser;
        }
    }
}
