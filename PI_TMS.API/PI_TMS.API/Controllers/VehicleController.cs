using Microsoft.AspNetCore.Mvc;
using TMS.Domain.Entites.Requests.Vehicle;
using TMS.Domain.Entites.Responses.Vehicle;
using TMS.Domain.Repositories;
using TMS.Infrastructure.Repositories;

namespace PI_TMS.API.Controllers
{

    [Route("vehicle")]
    [ApiController]

    public class VehicleController(IVehicleRepository vehicleRepository) : Controller
    {
        private readonly IVehicleRepository _vehicleRepository = vehicleRepository;

        [HttpGet("getAllVehicles")]
        public async Task<IActionResult> GetAllVehicles()
        {
            var data = await _vehicleRepository.GetAllVehiclesAsync();
            return Ok(data);
        }

        [HttpGet("getVehicleById")]
        public async Task<IActionResult> GetVehicleById(Guid id)
        {
            var data = await _vehicleRepository.GetVehicleByIdAsync(id);
            return Ok(data);
        }

        [HttpPost("addVehicle")]
        public async Task<IActionResult> AddVehicle(VehicleRequest vehicle)
        {

            var data = await _vehicleRepository.AddVehicleAsync(vehicle);
            return Ok();
        }

        [HttpPut("updateVehicle")]
        public async Task<IActionResult> UpdateVehicle(Guid id, VehicleResponse vehicle)
        {
            var data = await _vehicleRepository.UpdateVehicleAsync(id, vehicle);
            return Ok();
        }
        [HttpDelete("desactiveVehicle")]
        public async Task<IActionResult> DesactiveVehicle(Guid id)
        {
            var data = await _vehicleRepository.DesactiveVehicleAsync(id);
            return Ok();
        }
    }
}