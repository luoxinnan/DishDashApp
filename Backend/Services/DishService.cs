namespace Backend.Services;

using AutoMapper;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class DishService
{

    private readonly FoodDBContext _context;
    private readonly IMapper _mapper;

    public DishService(FoodDBContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<DishDto>> GetAllDishes()
    {
        var dishes = await _context.Dish
            .ToListAsync();
        return dishes.Select(d => _mapper.Map<DishDto>(d)).ToList();
    }

    public async Task<DishDto> GetDishByName(string name)
    {
        var dish = await _context.Dish.FirstOrDefaultAsync(i => i.Name == name);
        return _mapper.Map<DishDto>(dish);
    }


    public async Task<Dish> CreateDish(DishDto request)
    {
        if (_context.Dish == null)
            throw new ArgumentNullException("Table not exist!");

        var newDish = _mapper.Map<Dish>(request);
        _context.Dish.Add(newDish);
        await _context.SaveChangesAsync();
        return newDish;
    }

    public async Task DeleteDishByName(string name)
    {
        if (_context.Ingredient == null)
            throw new FileNotFoundException();

        var existingDish = await _context.Dish.FirstOrDefaultAsync(i => i.Name == name);
        if (existingDish == null)
            throw new FileNotFoundException();

        _context.Dish.Remove(existingDish);

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