using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;


public class IngredientRequest
{
    [Required]
    public string Name {get; set;}

    public int Quantity {get; set;} = 1;
    
}
