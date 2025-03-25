using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Service.Common.Interface.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(Guid userId);
    }
}
