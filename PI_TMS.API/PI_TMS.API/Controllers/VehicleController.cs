using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services.Interfaces;
using TMS.Domain.Entites.Requests.Vehicle;
using TMS.Domain.Entites.Responses.Vehicle;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Repositories;

namespace PI_TMS.API.Controllers
{

    [Route("api/vehicle")]
    [ApiController]

    public class VehicleController : Controller
    {
        private readonly IVehicleService _service;

        public VehicleController(IVehicleService service)
        {
            _service = service;
        }

        [HttpGet("getAllVehicles")]
        public async Task<IActionResult> GetAllVehicles()
        {
            var data = await _service.ListAllVehiclesAsync();
            return Ok(data);
        }

        [HttpGet("getVehicleById")]
        public async Task<IActionResult> GetVehicleById(Guid id)
        {
            var data = await _service.GetVehicleByIdAsync(id);
            return Ok(data);
        }

        [HttpPost("addVehicle")]
        public async Task<IActionResult> AddVehicle(VehicleRequest vehicle)
        {

            var data = await _service.RegisterVehicleAsync(vehicle);
            return Ok();
        }

        [HttpPut("updateVehicle")]
        public async Task<IActionResult> UpdateVehicle(Guid id, VehicleResponse vehicle)
        {
            var data = await _service.UpdateVehicleAsync(id, vehicle);
            return Ok();
        }
        [HttpDelete("desactiveVehicle")]
        public async Task<IActionResult> DesactiveVehicle(Guid id)
        {
            var data = await _service.DesactiveVehicleAsync(id);
            return Ok();
        }

        [HttpGet("getAllActivedVehicles")]
        public async Task<IActionResult> GetAllActived()
        {
            var data = await _service.ListAllActivedVehicles();
            return Ok(data);

        }

        [HttpGet("getAllDesactivedVehicles")]
        public async Task<IActionResult> GetAllDesactived()
        {
            var data = await _service.ListAllDesactivedVehicles();
            return Ok(data);

        }
    }
}