namespace Backend.Services;

using AutoMapper;
using Backend.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class IngredientService
{

    private readonly FoodDBContext _context;
        private readonly IMapper _mapper;

    public IngredientService(FoodDBContext context , IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<IngredientResponse>> GetAllIngreds()
    {
        var ingreds =  await _context.Ingredient
            .ToListAsync();
        return  ingreds.Select(ing => _mapper.Map<IngredientResponse>(ing)).ToList();

    }
    public async Task<IngredientResponse> GetIngredientById(int id)
    {
        var ingred = await _context.Ingredient.FindAsync(id);
        return _mapper.Map<IngredientResponse>(ingred);
    }

    public async Task UpdateIngredient(int id, IngredientRequest dto)
    {
        var existingIngred = await _context.Ingredient.FindAsync(id);

        if (existingIngred == null)
        {
            throw new ArgumentException("yo this guy does not exist");
        }
        existingIngred.Name = dto.Name;
        existingIngred.Quantity = dto.Quantity;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            throw new DbUpdateException("problem with the input data");
        }
    }

    public async Task<Ingredient> CreateIngredient(IngredientRequest request)
    {
        if(_context.Ingredient == null)
            throw new ArgumentNullException("Table not exist!");

        var newIngred = _mapper.Map<Ingredient>(request);
        _context.Ingredient.Add(newIngred);
        await _context.SaveChangesAsync();
        return newIngred;
    }

    

    public async Task DeleteIngredientById(int id)
    {
        if (_context.Ingredient == null)
            throw new FileNotFoundException();

        var ingred = await _context.Ingredient.FindAsync(id);
        if (ingred == null)
            throw new FileNotFoundException();

        _context.Ingredient.Remove(ingred);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch
        {
            throw new ArgumentException();
        }
    }
}