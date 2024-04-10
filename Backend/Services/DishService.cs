namespace Backend.Services;

using AutoMapper;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class DishService{

    private readonly FoodDBContext _context;
    private readonly IMapper _mapper;

    public DishService(FoodDBContext context, IMapper mapper){
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<Dish>> GetAllDishes()
    {
        return await _context.Dish
            .ToListAsync();
    }

    public async Task<DishDto> GetDishByName(string name){
        var dish = await _context.Dish.FirstOrDefaultAsync(i => i.Name == name);
        return _mapper.Map<DishDto>(dish);
    }

        public async Task DeleteDishByName(string name)
    {
        if (_context.Ingredient == null)
            throw new FileNotFoundException();
        
        var existingDish = await _context.Ingredient.FirstOrDefaultAsync(i => i.Name == name);
        if (existingDish == null)
            throw new FileNotFoundException();

        _context.Ingredient.Remove(existingDish);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch
        {
            throw new ArgumentException();
        }
    }


    public bool DishExists(string name)
    {
        return _context.Dish.Any(e => e.Name == name);
    }
}