

import { Dish } from "@/App";
import DishCard from "./DishCard"


export default function NoDishCards({dishes, cookFunc}: Props){
    return (
        <div>
            <h2 className="text-blue-700">Not Avaliable: </h2>
            {dishes.map((dish,i) => (
                <DishCard dish={dish} i={i} func= {cookFunc} canCook={false} />
                
            ))}
        
        </div>
    )
}

type Props = {
    dishes: Dish[];
    cookFunc: (i:number) => void;
}


