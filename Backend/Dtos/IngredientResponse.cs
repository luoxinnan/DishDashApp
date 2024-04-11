using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos;


public class IngredientResponse
{
    [Required]
    public string Name {get; set;}

    public int Quantity {get; set;} = 1;

    public string ImgAddress {get; set;} = "https://cdn-icons-png.flaticon.com/512/10107/10107601.png";
    
}
