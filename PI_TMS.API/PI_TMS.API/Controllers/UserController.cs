using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TMS.Domain.Entites.Requests.User;
using TMS.Domain.Entities;
using TMS.Domain.Repositories;

namespace PI_TMS.API.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController(IUserRepository repository) : ControllerBase
    {
        private readonly IUserRepository _repository = repository;

        [HttpGet("getallusers")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repository.GetAllAsync();
            if(data == null)
            {
                return NoContent();
            }

            return Ok(data);
        }

        [HttpPost("adduser")]
        public async Task<IActionResult> AddUser(RegisterUserRequest user)
        {
            throw new NotImplementedException();
        }
    }
}
