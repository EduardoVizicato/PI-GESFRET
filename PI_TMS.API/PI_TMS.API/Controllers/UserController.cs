using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            if(data.Count == 0)
            {
                return NoContent();
            }

            return Ok(data);
        }

        [HttpPost("adduser")]
        public async Task<IActionResult> AddUser(User user)
        {
            var data = await _repository.AddAsync(user);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
    }
}
