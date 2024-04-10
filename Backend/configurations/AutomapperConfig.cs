using AutoMapper;
using Backend.Dtos;
using Backend.Models;

namespace JokesAPI.Configuration;
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<IngredientRequest, Ingredient>().ReverseMap();
            CreateMap<IngredientResponse, Ingredient>().ReverseMap();
            CreateMap<DishDto, Dish>().ReverseMap();
            CreateMap<DishIngredientDto, DishIngredient>().ReverseMap();
        }
    }