namespace Backend.Services;


using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class DishService{

    private readonly FoodDBContext _context;

    public DishService(FoodDBContext context){
        _context = context;
    }

    public async Task<List<Dish>> GetAllDishes()
    {
        return await _context.Dish
            .ToListAsync();
    }
}