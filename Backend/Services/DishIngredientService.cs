namespace Backend.Services;

using AutoMapper;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class DishIngredientService{
    private readonly FoodDBContext _context;


    public DishIngredientService(FoodDBContext context)
    {
        _context = context;

    }

    public async Task<DishIngredient> CreateDishIngred(DishIngredient dishIngred)
    {
        if (_context.DishIngredient == null)
            throw new ArgumentNullException("Table not exist!");

        _context.DishIngredient.Add(dishIngred);
        await _context.SaveChangesAsync();
        return dishIngred;
    }

    private bool DishIngredientExists(int id)
    {
        return _context.DishIngredient.Any(e => e.Id == id);
    }

}