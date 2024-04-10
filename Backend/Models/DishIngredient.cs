using System.ComponentModel.DataAnnotations;

namespace Backend.Models;



public class DishIngredient{

    [Key]
    public int Id {get; set;}

    public string DishName {get; set;}

    public string IngredientName {get; set;}

    public int Quantity {get; set;}
}