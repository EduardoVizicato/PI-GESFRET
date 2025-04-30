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
    [Route("user")]
    [ApiController]
    public class UserController(IUserService service) : ControllerBase
    {
        private readonly IUserService _service = service;

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.ListAllUsers();
            return Ok(data);
        
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(RegisterUserRequest user)
        {

            var data = await _service.RegisterUser(user);
            return Ok(data);
        }
        
        [HttpGet("getUserbyId")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var data = await _service.GetUserById(id);
            return Ok(data);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] RegisterUserResponse user)
        {
            var data = await _service.UpdateUser(id, user);
            return Ok(data);
            
        }

        [HttpDelete("desactiveUser")]
        public async Task<IActionResult> DesactiveUser(Guid id)
        {
            var data = await _service.DesactiveUser(id);
            return Ok(data);
        }

        [HttpGet("getAllActivedUsers")]
        public async Task<IActionResult> GetAllActived()
        {
            var data = await _service.ListAllActivedUsers();
            return Ok(data);

        }

        [HttpGet("getAllDesactivedUsers")]
        public async Task<IActionResult> GetAllDesactived()
        {
            var data = await _service.ListAllDesactivedUsers();
            return Ok(data);

        }
        
        [HttpGet("getbyEmail")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var data = await _service.GetUserByEmail(email);
            return Ok(data);

        }
    }
}
