using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TMS.Service.Services.Authentication;
using TMS.Contracts.Authentication;
using LoginRequest = TMS.Contracts.Authentication.LoginRequest;
using RegisterRequest = TMS.Contracts.Authentication.RegisterRequest;

namespace PI_TMS.API.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        //private readonly IAuthService _authService;

        //public AuthenticationController(IAuthService authService)
        //{
        //    _authService = authService;
        //}

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            return Ok(request);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            return Ok(request);
        }
    }
}
