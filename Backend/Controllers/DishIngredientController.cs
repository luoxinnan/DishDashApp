using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishIngredientController : ControllerBase
    {
        private readonly FoodDBContext _context;

        public DishIngredientController(FoodDBContext context)
        {
            _context = context;
        }

        // GET: api/DishIngredient
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DishIngredient>>> GetDishIngredient()
        {
            return await _context.DishIngredient.ToListAsync();
        }

        // GET: api/DishIngredient/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DishIngredient>> GetDishIngredient(int id)
        {
            var dishIngredient = await _context.DishIngredient.FindAsync(id);

            if (dishIngredient == null)
            {
                return NotFound();
            }

            return dishIngredient;
        }

        // PUT: api/DishIngredient/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDishIngredient(int id, DishIngredient dishIngredient)
        {
            if (id != dishIngredient.Id)
            {
                return BadRequest();
            }

            _context.Entry(dishIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DishIngredientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DishIngredient
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DishIngredient>> PostDishIngredient(DishIngredient dishIngredient)
        {
            _context.DishIngredient.Add(dishIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDishIngredient", new { id = dishIngredient.Id }, dishIngredient);
        }

        // DELETE: api/DishIngredient/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDishIngredient(int id)
        {
            var dishIngredient = await _context.DishIngredient.FindAsync(id);
            if (dishIngredient == null)
            {
                return NotFound();
            }

            _context.DishIngredient.Remove(dishIngredient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DishIngredientExists(int id)
        {
            return _context.DishIngredient.Any(e => e.Id == id);
        }
    }
}
