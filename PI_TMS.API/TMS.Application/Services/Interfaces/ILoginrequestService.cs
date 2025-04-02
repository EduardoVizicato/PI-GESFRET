using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests;

namespace TMS.Contracts.Authentication
{
    public interface ILoginrequestService
    {
        Task<LoginRequest> Login(LoginRequest request);
    }
}
