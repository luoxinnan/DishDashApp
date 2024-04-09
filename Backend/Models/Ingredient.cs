using System.ComponentModel.DataAnnotations;

namespace Backend.Models;


public class Ingredient
{
    [Key]
    public int Id {get; set;}

    [Required]
    public string Name {get; set;}

    public int Quantity {get; set;} = 1;
    
}
