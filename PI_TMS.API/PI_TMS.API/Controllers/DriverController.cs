using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites;
using TMS.Domain.Entites.Requests.Driver;
using TMS.Domain.Entites.Responses.Drivers;
using TMS.Domain.Repositories;

namespace PI_TMS.API.Controllers
{

    [Route("api/driver")]
    [ApiController]

    public class DriverController : Controller
    {
        private readonly IDriverService _service;

        public DriverController(IDriverService service)
        {
            _service = service;
        }

        [HttpGet("getAllDrivers")]
        public async Task<IActionResult> GetAllDrivers()
        {
            var data = _service.ListAllDriversAsync();
            if (data == null)
            {
                return BadRequest();
            }

            return Ok(data);
        }

        [HttpGet("getDriverById")]
        public async Task<IActionResult> GetDriverById(Guid id)
        {
            var data = _service.GetDriverByIdAsync(id);
            if (data == null)
            {
                return BadRequest();
            }

            return Ok(data);
        }

        [HttpPost("addDriver")]
        public async Task<IActionResult> AddDriver(RegisterDriverRequest driver)
        {
            var data = _service.RegisterDriverAsync(driver);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpPut("updateDriver")]
        public async Task<IActionResult> UpdateDriver(Guid id, DriverResponse driver)
        {
            var data = _service.UpdateDriverAsync(id, driver);
            if (id == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpDelete("desactiveDriver")]
        public async Task<IActionResult> DesactiveDriver(Guid id)
        {
            var data = _service.DesactiveDriverAsync(id);
            if (data == null)
            {
                return BadRequest();
            }
            return Ok(data);
        }

        [HttpGet("getAllActivedDrivers")]
        public async Task<IActionResult> GetAllActived()
        {
            var data = await _service.ListAllActivedDrivers();
            return Ok(data);

        }

        [HttpGet("getAllDesactivedVehicles")]
        public async Task<IActionResult> GetAllDesactived()
        {
            var data = await _service.ListAllDesactivedDrivers();
            return Ok(data);

        }
    }   
}