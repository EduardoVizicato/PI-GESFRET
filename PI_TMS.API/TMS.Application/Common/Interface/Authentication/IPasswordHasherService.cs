using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMS.Domain.ValueObjects;

namespace TMS.Application.Common.Interface.Authentication
{
    public interface IPasswordHasherService
    {
        string HashPassword(PasswordVO password);
        bool VerifyPassword(PasswordVO hashedPassword, PasswordVO password);
    }
}
