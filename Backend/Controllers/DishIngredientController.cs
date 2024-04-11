using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.JSInterop.Infrastructure;

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
  

        // POST: api/DishIngredient
        [HttpPost]
        public async Task<ActionResult<DishIngredient>> PostDishIngredient(DishIngredient dishIngredient)
        {
            _context.DishIngredient.Add(dishIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDishIngredient", new { id = dishIngredient.Id }, dishIngredient);
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteDishIngredient(string name)
        {
            var allDishIngreds = await _context.DishIngredient.ToListAsync();
            if (allDishIngreds == null)
                return NotFound();
            
            var dishIngreds = allDishIngreds.Where(d => d.DishName == name);
            foreach(var di in dishIngreds)
            {
                _context.DishIngredient.Remove(di);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        private bool DishIngredientExists(int id)
        {
            return _context.DishIngredient.Any(e => e.Id == id);
        }
    }
}
