using System.ComponentModel.DataAnnotations;

namespace Backend.Models;



public class Dish{

    [Key]
    public int Id {get; set;}

    [Required]
    public string Name {get; set;}
}