using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TMS.Service.Common.Interface.Authentication
{
    public interface IJwtTokenGenerator
    {
        public string GenerateToken(Guid userId, string firstName, string lastName);
    }
}
