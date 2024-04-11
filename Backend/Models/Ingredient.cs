using System.ComponentModel.DataAnnotations;

namespace Backend.Models;


public class Ingredient
{
    [Key]
    public int Id {get; set;}

    [Required]
    public string Name {get; set;}

    public int Quantity {get; set;} = 1;

    public string ImgAddress {get; set;} = "https://cdn-icons-png.flaticon.com/512/10107/10107601.png";
    
}
