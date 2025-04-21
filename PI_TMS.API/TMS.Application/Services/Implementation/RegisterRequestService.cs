using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Repositories;

namespace TMS.Application.Services.Implementation
{
    public class RegisterRequestService : IRegisterRequestService
    {
        private readonly IUserRepository _userRepository;
        public RegisterRequestService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public Task<RegisterUserRequest> RegisterUser(RegisterUserRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
