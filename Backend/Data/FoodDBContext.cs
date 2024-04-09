using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

    public class FoodDBContext : DbContext
    {
        public FoodDBContext (DbContextOptions<FoodDBContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Models.Ingredient> Ingredient { get; set; } = default!;

public DbSet<Backend.Models.Dish> Dish { get; set; } = default!;

public DbSet<Backend.Models.DishIngredient> DishIngredient { get; set; } = default!;
    }
