

import DishCard from "./DishCard"
import { Props } from "./types/dishCardsProps"

export default function NoDishCards({dishes}: Props){
    return (
        <div>
            <h2>Not Avaliable: </h2>
            {dishes.map(dish => (
                <DishCard dish={dish} />
                
            ))}
        
        </div>
    )
}


