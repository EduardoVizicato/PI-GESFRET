using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entites.Responses.User;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;

namespace PI_TMS.API.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController(IUserRepository repository) : ControllerBase
    {
        private readonly IUserRepository _repository = repository;

        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repository.GetAllAsync();
            return Ok(data);
        
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(RegisterUserRequest user)
        {

            var data = await _repository.AddAsync(user);
            return Ok(data);
        }
        
        [HttpGet("getUserbyId")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var data = await _repository.GetByIdAsync(id);
            return Ok(data);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] RegisterUserResponse user)
        {
            var data = await _repository.UpdatesUserAsync(id, user);
            return Ok(data);
            
        }

        [HttpDelete("desactiveUser")]
        public async Task<IActionResult> DesactiveUser(Guid id)
        {
            var data = await _repository.DesactiveUserAsync(id);
            return Ok(data);
        }
        
    }
}
