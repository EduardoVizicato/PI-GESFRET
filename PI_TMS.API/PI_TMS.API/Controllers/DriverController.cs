using Microsoft.AspNetCore.Mvc;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Driver;
using TMS.Domain.Entites.Responses.Drivers;
using TMS.Domain.Repositories;

namespace PI_TMS.API.Controllers
{

    [Route("driver")]
    [ApiController]

    public class DriverController(IDriverRepository repository) : Controller
    {
        private readonly IDriverRepository _repository = repository;

        [HttpGet("getAllDrivers")]
        public async Task<IActionResult> GetAllDrivers()
        {
            var data = _repository.GetAllDriversAsync();
            if (data == null)
            {
                return BadRequest();
            }

            return Ok(data);
        }

        [HttpGet("getDriverById")]
        public async Task<IActionResult> GetDriverById(Guid id)
        {
            var data = _repository.GetDriverByIdAsync(id);
            if (data == null)
            {
                return BadRequest();
            }

            return Ok(data);
        }

        [HttpPost("addDriver")]
        public async Task<IActionResult> AddDriver(RegisterDriverRequest driver)
        {
            var data = _repository.AddDriverAsync(driver);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpPut("updateDriver")]
        public async Task<IActionResult> UpdateDriver(Guid id, DriverResponse driver)
        {
            var data = _repository.UpdateDriverAsync(id, driver);
            if (id == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpDelete("desactiveDriver")]
        public async Task<IActionResult> DesactiveDriver(Guid id)
        {
            var data = _repository.DesactiveDriverAsync(id);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }
}   
}