using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entities;

namespace TMS.Domain.Repositories
{
    public interface IRegisterRequestService
    {
        Task<RegisteruserRequest> RegisterUser(RegisteruserRequest request);
    }
}
