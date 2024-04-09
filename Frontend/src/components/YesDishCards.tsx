

import DishCard from "./DishCard"
import { Props } from "./types/dishCardsProps"

export default function YesDishCards({dishes}: Props){
    return (
        <div>
            <h2>Avaliable: </h2>
            {dishes.map(dish => (
                <DishCard dish={dish} />
                
            ))}
        
        </div>
    )
}


