using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entites.Responses.User;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;

namespace PI_TMS.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _userService.ListAllUsers();
            return Ok(data);
        
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(RegisterUserRequest user)
        {

            var data = await _userService.RegisterUser(user);
            return Ok(data);
        }
        
        [HttpGet("getUserbyId")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var data = await _userService.GetUserById(id);
            return Ok(data);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] RegisterUserResponse user)
        {
            var data = await _userService.UpdateUser(id, user);
            return Ok(data);
            
        }

        [HttpDelete("desactiveUser")]
        public async Task<IActionResult> DesactiveUser(Guid id)
        {
            var data = await _userService.DesactiveUser(id);
            return Ok(data);
        }

        [HttpGet("getAllActivedUsers")]
        public async Task<IActionResult> GetAllActived()
        {
            var data = await _userService.ListAllActivedUsers();
            return Ok(data);

        }

        [HttpGet("getAllDesactivedUsers")]
        public async Task<IActionResult> GetAllDesactived()
        {
            var data = await _userService.ListAllDesactivedUsers();
            return Ok(data);

        }
        
        [HttpGet("getbyEmail")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var data = await _userService.GetUserByEmail(email);
            return Ok(data);

        }
    }
}
