using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TMS.Service.Services.Authentication;
using TMS.Contracts.Authentication;


namespace PI_TMS.API.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequestModel request)
        {
            var authResult = _authService.Register(
                request.FirstName,
                request.Lastname,
                request.Email,
                request.Password
            );

            var response = new AuthenticationResponseModel
            {
                Id = authResult.Id,
                FirstName = authResult.FirstName,
                LastName = authResult.LastName,
                Email = authResult.Email,
                Token = authResult.Token
            };
            

            if (request == null)
            {
                return BadRequest("Request body is null");
            }

            return Ok(new { message = "Received data", data = response });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequestModel request)
        {
            var authResult = _authService.Login(
                request.Email,
                request.Password
            );

            var response = new AuthenticationResponseModel
            {
                Id = authResult.Id,
                FirstName = authResult.FirstName,
                LastName = authResult.LastName,
                Email = authResult.Email,
                Token = authResult.Token
            };

            if (request == null)
            {
                return BadRequest("Request body is null");
            }

            return Ok(new { message = "Received data", data = response });
        }
    }
}
