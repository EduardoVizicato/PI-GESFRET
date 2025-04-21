using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.Entites.Requests;
using TMS.Domain.Entites.Requests.User;

namespace TMS.Contracts.Authentication
{
    public interface ILoginService
    {
        Task<T> Login(T request);
    }
}
