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
            new Ingredient { Name = "Tomato", Quantity = 10 },
            new Ingredient { Name = "Egg", Quantity = 20 },
            new Ingredient { Name = "Spaghetti", Quantity = 5 },
            new Ingredient { Name = "Bacon", Quantity = 8 },
            new Ingredient { Name = "Chicken", Quantity = 12 },
            new Ingredient { Name = "Bell pepper", Quantity = 6 },
            new Ingredient { Name = "Onion", Quantity = 7 }
            // Add more ingredients as needed
        };

        context.Ingredient.AddRange(ingredients);
    }

    private static void SeedDishIngredients(FoodDBContext context)
    {
        var dishIngredients = new List<DishIngredient>
        {
            // Tomato fried egg
            new DishIngredient { DishId = 1, IngredientId = 1, Quantity = 2 }, // Tomatoes
            new DishIngredient { DishId = 1, IngredientId = 2, Quantity = 3 }, // Eggs

            // Spaghetti Carbonara
            new DishIngredient { DishId = 2, IngredientId = 3, Quantity = 1 }, // Spaghetti
            new DishIngredient { DishId = 2, IngredientId = 2, Quantity = 2 }, // Eggs
            new DishIngredient { DishId = 2, IngredientId = 4, Quantity = 3 }, // Bacon
            new DishIngredient { DishId = 2, IngredientId = 7, Quantity = 1 }, // Onion

            // Chicken Stir Fry
            new DishIngredient { DishId = 3, IngredientId = 5, Quantity = 2 }, // Chicken
            new DishIngredient { DishId = 3, IngredientId = 6, Quantity = 1 }, // Bell pepper
            new DishIngredient { DishId = 3, IngredientId = 7, Quantity = 1 }, // Onion

            // Chicken Soup (using common ingredients)
            new DishIngredient { DishId = 4, IngredientId = 5, Quantity = 1 }, // Chicken
            new DishIngredient { DishId = 4, IngredientId = 7, Quantity = 1 }, // Onion
            new DishIngredient { DishId = 4, IngredientId = 1, Quantity = 2 }, // Tomatoes
        };

        context.DishIngredient.AddRange(dishIngredients);
    }
}
