using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;


public class DishDto
{
    [Required]
    public string Name {get; set;}
    
}
