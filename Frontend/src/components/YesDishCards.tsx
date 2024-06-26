
import { Dish } from "../appTypes";
import DishCard from "./DishCard"

export default function YesDishCards({dishes, cookFunc, deleteFunc}: Props){
    return (
        <section className="card bg-base-100 shadow-xl mt-8 p-5">
            <h2 className="bigger-text" style={{ fontSize: "1.3rem" }}>Available: </h2>
            {dishes.map((dish,i) => (
                <DishCard dish={dish} i={i} cookFunc={cookFunc} canCook={true} deleteFunc={deleteFunc}/>
            ))}
        
        </section>
    )
}

type Props = {
    dishes: Dish[];
    cookFunc: (i:number) => void;
    deleteFunc: (i:number) => void;
}

