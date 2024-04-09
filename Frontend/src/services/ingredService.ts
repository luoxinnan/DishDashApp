import { Ingred } from "@/components/appTypes";

export async function GetIngreds():  Promise<Ingred[]>{
    const response = await fetch("http://localhost:5279/api/Ingredient");
    const allCustomers: Ingred[] = await response.json();
    return allCustomers;
}