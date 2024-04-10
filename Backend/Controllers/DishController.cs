
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;
using Backend.Dtos;
using AutoMapper;
using System.Drawing;

namespace Backend.Controllers;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DishController : ControllerBase
{
    private readonly DishService _service;
    private readonly IMapper _mapper;

    public DishController(DishService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetDishes()
    {

        return Ok(_service.GetAllDishes());
    }


    [HttpGet("{name}")]
    public async Task<ActionResult<DishDto>> GetIngredient(string name)
    {
        var response = await _service.GetDishByName(name);
        if (response == null)
            return NotFound();
        return Ok(response);
    }


    [HttpPost]
    public async Task<ActionResult<DishDto>> PostIngredient(DishDto request)
    {
        try
        {
            var newDish = await _service.CreateDish(request);
            var response = _mapper.Map<DishDto>(newDish);
            return CreatedAtAction(nameof(GetIngredient), new { id = newDish.Id }, response);

        }
        catch (ArgumentException)
        {
            return BadRequest();
        }
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
    public async Task<IActionResult> CheckDishExists(string name)
    {
        var exist = _service.DishExists(name);
        return Ok(exist);
    }

}

