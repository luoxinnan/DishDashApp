import { Dish, Ingred } from "@/appTypes";

export async function GetDishes(){
    const response = await fetch("http://localhost:5279/api/Dish");
    const allDishesData = await response.json();
    return allDishesData;
}

export async function GetYesDishes() : Promise<Dish[]>{
    const allDishesData = await GetDishes();
    const yesDishesData = allDishesData.result.yesDishes;

    const yesDishes: Dish[] = yesDishesData.map((dishData: any) => {
        const ingreds: Ingred[] = dishData.ingredsEnough.map((ingred: any) => ({
            name: ingred.name,
            quantity: ingred.quantity
        }));
        return { name: dishData.name, ingredsEnough: ingreds, ingredsNotEnough: [] };
    });

    return yesDishes;
}

export async function GetNoDishes(): Promise<Dish[]>{
    const allDishesData = await GetDishes();
    const noDishesData = allDishesData.result.noDishes;

    const noDishes: Dish[] = noDishesData.map((dishData: any) => {
        const ingredsEnough: Ingred[] = dishData.ingredsEnough.map((ingred: any) => ({
            name: ingred.name,
            quantity: ingred.quantity
        }));
        const ingredsNotEnough: Ingred[] = dishData.ingredsNotEnough.map((ingred: any) => ({
            name: ingred.name,
            quantity: ingred.quantity
        }));
        // Combine ingredsEnough and ingredsNotEnough to get all ingredients for the dish
        return { name: dishData.name, ingredsEnough: ingredsEnough, ingredsNotEnough: ingredsNotEnough };
    });
    return noDishes;
}

export async function PostDish(dishName: string, ingreds: Ingred[]){
    const disResponse = await fetch("http://localhost:5279/api/Dish", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: dishName})
    });
    if(!disResponse.ok)
        throw new Error('Failed to add new dish')

    for (const ingred of ingreds) {
        const dishIngredResponse = await fetch("http://localhost:5279/api/DishIngredient", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                DishName: dishName, 
                IngredientName: ingred.name, 
                Quantity: ingred.quantity // Ensure property name is "Quantity"
            })
        });
        if(!dishIngredResponse.ok)
            throw new Error("Failed to add new DishIngred");
    }

    
}

