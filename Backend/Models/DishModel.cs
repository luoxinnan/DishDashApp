
namespace Backend.Models;



public class DishModel{
    public string name {get; set;}

    public List<IngredientModel> ingredsEnough {get; set;}
    public List<IngredientModel> ingredsNotEnough{get;set;}
}