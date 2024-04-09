import { Dish } from "../App";


export default function DishCard({dish}: dishCardProps){
    return (
        <>
        <h3>{dish.name}</h3>
        {dish.ingreds.map(ingred => (
            <p>{ingred.name}: {ingred.quantity}</p>
        ))}
        </>
    )
}

type dishCardProps = {
    dish: Dish;
}