using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Backend.Models;
using Backend.Services;


public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new FoodDBContext(
            serviceProvider.GetRequiredService<DbContextOptions<FoodDBContext>>()))
        {
            // Clear the database
            context.Database.EnsureDeleted();

            // Create the database if it does not exist
            context.Database.EnsureCreated();

            // Seed dishes and ingredients
            SeedDishes(context);
            SeedIngredients(context);

            // Save changes to the database
            context.SaveChanges();
        }
    }

    private static void SeedDishes(FoodDBContext context)
    {
        var dishes = new List<Dish>
        {
            new Dish { Name = "Tomato fried egg" },
            new Dish { Name = "Spaghetti Carbonara" },
            new Dish { Name = "Chicken Stir Fry" },
            new Dish { Name = "Chicken Soup" }
            // Add more dishes as needed
        };

        context.Dish.AddRange(dishes);

        // Save changes to get the dish IDs
        context.SaveChanges();

        // Seed dish-ingredient relationships
        SeedDishIngredients(context);
    }

    private static void SeedIngredients(FoodDBContext context)
    {
        var ingredients = new List<Ingredient>
        {
            new Ingredient { Name = "Tomato", Quantity = 8 },
            new Ingredient { Name = "Egg", Quantity = 2 },
            new Ingredient { Name = "Spaghetti", Quantity = 5 },
            new Ingredient { Name = "Bacon", Quantity = 2 },
            new Ingredient { Name = "Chicken", Quantity = 5 },
            new Ingredient { Name = "Bell pepper", Quantity = 1 },
            new Ingredient { Name = "Onion", Quantity = 10 },
            new Ingredient { Name = "Ginger", Quantity = 2 }
            // Add more ingredients as needed
        };

        context.Ingredient.AddRange(ingredients);
    }

private static void SeedDishIngredients(FoodDBContext context)
{
    var dishIngredients = new List<DishIngredient>
    {
        // Tomato fried egg
        new DishIngredient { DishName = "Tomato fried egg", IngredientName = "Tomato", Quantity = 2 },
        new DishIngredient { DishName = "Tomato fried egg", IngredientName = "Egg", Quantity = 3 },

        // Spaghetti Carbonara
        new DishIngredient { DishName = "Spaghetti Carbonara", IngredientName = "Spaghetti", Quantity = 1 },
        new DishIngredient { DishName = "Spaghetti Carbonara", IngredientName = "Egg", Quantity = 2 },
        new DishIngredient { DishName = "Spaghetti Carbonara", IngredientName = "Bacon", Quantity = 3 },
        new DishIngredient { DishName = "Spaghetti Carbonara", IngredientName = "Onion", Quantity = 1 },

        // Chicken Stir Fry
        new DishIngredient { DishName = "Chicken Stir Fry", IngredientName = "Chicken", Quantity = 2 },
        new DishIngredient { DishName = "Chicken Stir Fry", IngredientName = "Spaghetti", Quantity = 1 },
        new DishIngredient { DishName = "Chicken Stir Fry", IngredientName = "Onion", Quantity = 1 },

        // Chicken Soup (using common ingredients)
        new DishIngredient { DishName = "Chicken Soup", IngredientName = "Chicken", Quantity = 1 },
        new DishIngredient { DishName = "Chicken Soup", IngredientName = "Onion", Quantity = 1 },
        new DishIngredient { DishName = "Chicken Soup", IngredientName = "Tomato", Quantity = 2 }
    };

    context.DishIngredient.AddRange(dishIngredients);
}
}
