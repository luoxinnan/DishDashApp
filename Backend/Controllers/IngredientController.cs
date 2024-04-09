
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class IngredientController : ControllerBase
{
    private readonly IngredientService _service;

    public IngredientController(IngredientService service)
    {
        _service = service;
    }

    // GET: api/Ingredient
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredients()
    {
        return await _service.GetAllIngreds();
    }

    // GET: api/Ingredient/5
    // [HttpGet("{id}")]
    // public async Task<ActionResult<Ingredient>> GetIngredient(int id)
    // {
    //     var ingredient = await _context.Ingredient.FindAsync(id);

    //     if (ingredient == null)
    //     {
    //         return NotFound();
    //     }

    //     return ingredient;
    // }

    // // PUT: api/Ingredient/5
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPut("{id}")]
    // public async Task<IActionResult> PutIngredient(int id, Ingredient ingredient)
    // {
    //     if (id != ingredient.Id)
    //     {
    //         return BadRequest();
    //     }

    //     _context.Entry(ingredient).State = EntityState.Modified;

    //     try
    //     {
    //         await _context.SaveChangesAsync();
    //     }
    //     catch (DbUpdateConcurrencyException)
    //     {
    //         if (!IngredientExists(id))
    //         {
    //             return NotFound();
    //         }
    //         else
    //         {
    //             throw;
    //         }
    //     }

    //     return NoContent();
    // }

    // // POST: api/Ingredient
    // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // [HttpPost]
    // public async Task<ActionResult<Ingredient>> PostIngredient(Ingredient ingredient)
    // {
    //     _context.Ingredient.Add(ingredient);
    //     await _context.SaveChangesAsync();

    //     return CreatedAtAction("GetIngredient", new { id = ingredient.Id }, ingredient);
    // }

    // // DELETE: api/Ingredient/5
    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteIngredient(int id)
    // {
    //     var ingredient = await _context.Ingredient.FindAsync(id);
    //     if (ingredient == null)
    //     {
    //         return NotFound();
    //     }

    //     _context.Ingredient.Remove(ingredient);
    //     await _context.SaveChangesAsync();

    //     return NoContent();
    // }

    // private bool IngredientExists(int id)
    // {
    //     return _context.Ingredient.Any(e => e.Id == id);
    // }
}

