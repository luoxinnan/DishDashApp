using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Dtos;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishIngredientController : ControllerBase
    {
        private readonly DishIngredientService _service;

        public DishIngredientController(DishIngredientService service)
        {
            _service = service;
        }

        // GET: api/DishIngredient
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DishIngredientDto>>> GetDishIngredients()
        {
            return await _service.GetAllDishIngredients();
        }

        // POST: api/DishIngredient
        [HttpPost]
        public async Task<ActionResult<DishIngredientDto>> PostDishIngredient(DishIngredientDto dishIngredient)
        {
            var newDishIngredient = await _service.CreateDishIngredient(dishIngredient);
            return CreatedAtAction(nameof(PostDishIngredient), new { name = newDishIngredient.DishName }, newDishIngredient);
        }

        // DELETE: api/DishIngredient/name
        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteDishIngredient(string name)
        {
            var result = await _service.DeleteDishIngredientsByName(name);
            if (result)
                return Ok();
            else
                return NotFound();
        }
    }
}
