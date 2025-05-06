using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services.Interfaces;

namespace PI_TMS.API.Controllers
{

    [Route("api/travel")]
    [ApiController]
    public class TravelController : Controller
    {
        private readonly ITravelService _travelService;
        public TravelController(ITravelService travelService)
        {
            _travelService = travelService;
        }


        [HttpGet("getAll")]
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