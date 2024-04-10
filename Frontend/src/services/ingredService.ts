import { Ingred } from "@/components/appTypes";

export async function GetIngreds():  Promise<Ingred[]>{
    const response = await fetch("http://localhost:5279/api/Ingredient");
    const allCustomers: Ingred[] = await response.json();
    return allCustomers;
}

export async function PostIngred(newIngred: Ingred){
    const name = newIngred.name;
    const quantity = newIngred.quantity;
    const response = await fetch("http://localhost:5279/api/Ingredient", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, quantity})
    })

    if(!response.ok)
        throw new Error('Faild to add new ingredient')
}

export async function PutIngred(ingred: Ingred){
    const name = ingred.name;
    const quantity = ingred.quantity;
    const response = await fetch("http://localhost:5279/api/Ingredient",{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, quantity})
    })

    if(!response.ok)
        throw new Error('Faild to change ingredient quantity')
}

export async function DeleteIngred(name: string){
    const response = await fetch(`http://localhost:5279/api/Ingredient?name=${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
    
}