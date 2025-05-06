using Microsoft.AspNetCore.Mvc;
using TMS.Application.Services.Interfaces;

namespace PI_TMS.API.Controllers
{

    [Route("api/load")]
    [ApiController]
    public class LoadController : Controller
    {
        private readonly ILoadService _loadService;
        public LoadController(ILoadService loadService)
        {
            _loadService = loadService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _loadService.GetAllAsync();
            return Ok(data);
        }
    }
}