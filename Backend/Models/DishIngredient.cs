using System.ComponentModel.DataAnnotations;

namespace Backend.Models;



public class DishIngredient{

    [Key]
    public int Id {get; set;}

    public int DishId {get; set;}

    public int IngredientId {get; set;}

    public int Quantity {get; set;}

    [Required]
    public string Name {get; set;}
}