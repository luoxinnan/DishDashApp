namespace Backend.Services;


using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class IngredientService{

    private readonly FoodDBContext _context;

    public IngredientService(FoodDBContext context){
        _context = context;
    }

    public async Task<List<Ingredient>> GetAllIngreds()
    {
        return await _context.Ingredient
            .ToListAsync();
    }
}