
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
    private readonly FoodDBContext _context;

    public DishController(DishService service, FoodDBContext context, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetDishes()
    {
        var dishes = await _context.Dish.ToListAsync();
        var ingredients = await _context.Ingredient.ToListAsync();

        // Filter out dishes with enough and not enough ingredients
        var dishesWithEnoughIngredients = new List<DishModel>();
        var dishesWithNotEnoughIngredients = new List<DishModel>();

        foreach (var dish in dishes)
        {
            // Check if all ingredients for the dish have enough quantity
            bool hasEnoughIngredients = true;
            var ingredsEnough = new List<IngredientModel>();
            var ingredsNotEnough = new List<IngredientModel>();

            foreach (var dishIngred in _context.DishIngredient.Where(d => d.DishId == dish.Id))
            {
                var ingredient = ingredients.FirstOrDefault(i => i.Id == dishIngred.IngredientId);
                if (ingredient == null || ingredient.Quantity < dishIngred.Quantity)
                {
                    hasEnoughIngredients = false;
                    ingredsNotEnough.Add(new IngredientModel { name = ingredient.Name, quantity = dishIngred.Quantity });
                }
                else
                {
                    ingredsEnough.Add(new IngredientModel { name = ingredient.Name, quantity = dishIngred.Quantity });
                }
            }

            var dishObject = new DishModel
            {
                name = dish.Name,
                ingredsEnough = ingredsEnough,
                ingredsNotEnough = ingredsNotEnough
            };

            if (hasEnoughIngredients)
                dishesWithEnoughIngredients.Add(dishObject);
            else
                dishesWithNotEnoughIngredients.Add(dishObject);
        }

        return Ok(new { DishesWithEnoughIngredients = dishesWithEnoughIngredients, DishesWithNotEnoughIngredients = dishesWithNotEnoughIngredients });
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

