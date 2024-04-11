namespace Backend.Services;

using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class DishIngredientService
    {
        private readonly FoodDBContext _context;

        public DishIngredientService(FoodDBContext context)
        {
            _context = context;
        }

        public async Task<List<DishIngredientDto>> GetAllDishIngredients()
        {
            var dishIngredients = await _context.DishIngredient.ToListAsync();
            return dishIngredients.Select(di => new DishIngredientDto
            {
                DishName = di.DishName,
                IngredientName = di.IngredientName,
                Quantity = di.Quantity
            }).ToList();
        }

        public async Task<DishIngredientDto> CreateDishIngredient(DishIngredientDto request)
        {
            var newDishIngredient = new DishIngredient
            {
                DishName = request.DishName,
                IngredientName = request.IngredientName,
                Quantity = request.Quantity
            };

            _context.DishIngredient.Add(newDishIngredient);
            await _context.SaveChangesAsync();
            
            return new DishIngredientDto
            {
                DishName = newDishIngredient.DishName,
                IngredientName = newDishIngredient.IngredientName,
                Quantity = newDishIngredient.Quantity
            };
        }

        public async Task<bool> DeleteDishIngredientsByName(string name)
        {
            var dishIngredients = await _context.DishIngredient.Where(di => di.DishName == name).ToListAsync();
            if (dishIngredients == null || dishIngredients.Count == 0)
                return false;

            _context.DishIngredient.RemoveRange(dishIngredients);
            await _context.SaveChangesAsync();

            return true;
        }

        public bool DishIngredientExists(int id)
        {
            return _context.DishIngredient.Any(di => di.Id == id);
        }
    }

