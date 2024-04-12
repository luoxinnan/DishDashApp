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
            new Ingredient { Name = "Tomato", Quantity = 6, ImgAddress="https://cdn-icons-png.flaticon.com/512/2909/2909894.png" },
            new Ingredient { Name = "Egg", Quantity = 9, ImgAddress="https://cdn-icons-png.freepik.com/256/2437/2437740.png" },
            new Ingredient { Name = "Spaghetti", Quantity = 2, ImgAddress="https://cdn-icons-png.flaticon.com/512/2836/2836660.png" },
            new Ingredient { Name = "Bacon", Quantity = 2, ImgAddress="https://cdn-icons-png.flaticon.com/512/1857/1857921.png" },
            new Ingredient { Name = "Chicken", Quantity = 3, ImgAddress="https://cdn-icons-png.flaticon.com/512/821/821023.png" },
            new Ingredient { Name = "Garlic", Quantity = 1, ImgAddress="https://cdn-icons-png.flaticon.com/512/6108/6108170.png" },
            new Ingredient { Name = "Onion", Quantity = 8, ImgAddress="https://cdn-icons-png.flaticon.com/512/184/184506.png" },
            new Ingredient { Name = "Ginger", Quantity = 2, ImgAddress="https://cdn-icons-png.flaticon.com/512/1593/1593696.png" }
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
        new DishIngredient { DishName = "Chicken Stir Fry", IngredientName = "Chilli", Quantity = 1 },
        new DishIngredient { DishName = "Chicken Stir Fry", IngredientName = "Onion", Quantity = 1 },

        // Chicken Soup (using common ingredients)
        new DishIngredient { DishName = "Chicken Soup", IngredientName = "Chicken", Quantity = 1 },
        new DishIngredient { DishName = "Chicken Soup", IngredientName = "Onion", Quantity = 1 },
        new DishIngredient { DishName = "Chicken Soup", IngredientName = "Tomato", Quantity = 2 }
    };

    context.DishIngredient.AddRange(dishIngredients);
}
}
