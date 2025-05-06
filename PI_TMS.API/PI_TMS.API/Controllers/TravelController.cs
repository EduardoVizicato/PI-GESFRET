using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services.Interfaces;

namespace PI_TMS.API.Controllers
{

    [Route("api/travel")]
    [ApiController]
    public class TravelController(ITravelService travelService) : Controller
    {
        private readonly ITravelService _travelService = travelService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _travelService.GetAllAsync();
            if (data == null)
            {
                return BadRequest();
            }

            return Ok(data);
        }
    }
}