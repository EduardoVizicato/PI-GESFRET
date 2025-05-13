using TMS.Domain.ValueObjects;

namespace TMS.Application.Services.Interfaces;

public interface ILoginService
{
    Task<string> LoginAsync(EmailVO email, PasswordVO password);
}