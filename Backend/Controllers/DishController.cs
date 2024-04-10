
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;
using Backend.Dtos;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DishController : ControllerBase
{
    private readonly DishService _service;

    public DishController(DishService service)
    {
        _service = service;
    }

    // GET: api/Dish
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Dish>>> GetDishes()
    {
        return await _service.GetAllDishes();
    }

    [HttpGet("{name}")]
    public async Task<ActionResult<DishDto>> GetIngredient(string name)
    {
        var response = await _service.GetDishByName(name);
        if (response == null)
            return NotFound();
        return Ok(response);
    }

    // DELETE: api/Dish/5
    [HttpDelete("{name}")]
    public async Task<IActionResult> DeleteDish(string name)
    {
        try
        {
            await _service.DeleteDishByName(name);
            return Ok();
        }
        catch (FileNotFoundException)
        {
            return NotFound();
        }
        catch (ArgumentException)
        {
            return NoContent();
        }
    }


    [HttpGet("DishExists")]
    public async Task<IActionResult> CheckDishExists(string name){
        var exist =  _service.DishExists(name);
        return Ok(exist);
    }

}

