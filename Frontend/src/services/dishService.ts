import { Dish, Ingred } from "@/appTypes";

 async function GetDishes(){
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
    const response = await fetch("http://localhost:5279/api/Dish", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: dishName})
    });
    if(!response.ok)
        throw new Error('Faild to add new dish')
}