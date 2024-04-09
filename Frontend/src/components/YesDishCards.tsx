

import { Dish } from "@/App";
import DishCard from "./DishCard"

export default function YesDishCards({dishes, cookFunc}: Props){
    return (
        <div>
            <h2 className="text-blue-700">Avaliable: </h2>
            {dishes.map((dish,i) => (
                <DishCard dish={dish} i={i} func={cookFunc} canCook={true}/>
                
            ))}
        
        </div>
    )
}

type Props = {
    dishes: Dish[];
    cookFunc: (i:number) => void;
}

