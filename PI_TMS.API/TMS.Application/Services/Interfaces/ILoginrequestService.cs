using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests;
using TMS.Domain.Entites.Requests.User;

namespace TMS.Contracts.Authentication
{
    public interface ILoginRequestService
    {
<<<<<<< HEAD
        Task<LoginRequest> Login(LoginRequest request);
=======
        Task<ILoginRequestService> Login(LoginUserRequest request);
>>>>>>> 54a131594c3821b024ad1e993b4e11ae27d66cd5
    }
}
