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
        Task<LoginUserRequest> Login(LoginUserRequest request);
        Task<ILoginRequestService> Login(LoginUserRequest request);
    }
}
