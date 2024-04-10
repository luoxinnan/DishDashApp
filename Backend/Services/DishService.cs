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

    public async Task<Object> GetAllDishes()
    {
               var dishes = await _context.Dish.ToListAsync();
        var ingredients = await _context.Ingredient.ToListAsync();

        // Filter out dishes with enough and not enough ingredients
        var yesDishes = new List<DishModel>();
        var noDishes = new List<DishModel>();

        foreach (var dish in dishes)
        {
            // Check if all ingredients for the dish have enough quantity
            bool hasEnoughIngredients = true;
            var ingredsEnough = new List<IngredientModel>();
            var ingredsNotEnough = new List<IngredientModel>();

            foreach (var dishIngred in _context.DishIngredient.Where(d => d.DishName == dish.Name))
            {
                var ingredient = ingredients.FirstOrDefault(i => i.Name == dishIngred.IngredientName);
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
                yesDishes.Add(dishObject);
            else
                noDishes.Add(dishObject);
        }
        return new {YesDishes = yesDishes, NoDishes = noDishes};
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