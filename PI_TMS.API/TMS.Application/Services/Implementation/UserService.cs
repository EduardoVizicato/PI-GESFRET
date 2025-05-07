using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Application.Common.Interface.Authentication;
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
        private readonly IPasswordHasherService _passwordHasherService;
        public UserService(IUserRepository userRepository, ILogger<UserService> logger, IPasswordHasherService passwordHasherService)
        {
            _userRepository = userRepository;
            _logger = logger;
            _passwordHasherService = passwordHasherService;

        }
        public Task<bool?> DesactiveUser(Guid id)
        {
            var desactiveUser = _userRepository.DesactiveUserAsync(id);
            return desactiveUser;
        }

        public async Task<bool?> UpdateUser(Guid id, RegisterUserResponse request)
        {
            var updateUser = await _userRepository.UpdatesUserAsync(id, request);
            return updateUser;
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

        public async Task<User> ValidateUser(string email, string password)
        {
            var user = await _userRepository.GetUserByEmail(email);
            if (user == null) return null;

            var isValid = _passwordHasherService.VerifyPassword(user.Password, password);
            return isValid ? user : null;
        }

        public Task<List<User>> ListAllUsers()
        {
            var listAllUsers = _userRepository.GetAllAsync();
            return listAllUsers;
        }

        public async Task<bool?> RegisterUser(RegisterUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Password)) return false;

            var hashedPassword = _passwordHasherService.HashPassword(request.Password);

            var user = new User(
                request.FirstName,
                request.LastName,
                request.Email,
                hashedPassword,
                request.IdentificationNumber,
                request.PhoneNumber
            )
            {
                IsActive = true
            };

            await _userRepository.AddAsync(user);
            return true;
        }
    }
}
