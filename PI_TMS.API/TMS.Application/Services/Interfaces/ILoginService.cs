namespace TMS.Application.Services.Interfaces;

public interface ILoginService
{
    Task<string> LoginAsync(string email, string password);
}