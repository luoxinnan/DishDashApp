import { useState } from "react";
import Counter from "./Counter";
import "./styles/ingredCardsStyles.css"
import { Dish, Ingred } from '../appTypes';
import { DeleteIngred, GetIngreds, PutIngred } from "@/services/ingredService";
import { GetNoDishes, GetYesDishes } from "@/services/dishService";

export default function IngredCards({ingreds, yesDishes, noDishes }: Props){
    const [updatedIngreds, setUpdatedIngreds] = useState(ingreds);
    const [NewYesDishes, setNewYesDishes] = useState<Dish[]>(yesDishes);
    const [NewNoDishes, setNewNoDishes] = useState<Dish[]>(noDishes);

    async function handleQuantityChange (index: number, newQuantity: number) {
      const newIngreds = [...updatedIngreds];
      const ingredToChange = newIngreds[index];

      if(newQuantity == 0){
        await DeleteIngred(ingredToChange.name)
      }else{
        ingredToChange.quantity = newQuantity;
        await PutIngred(ingredToChange);
      }
      setUpdatedIngreds(await GetIngreds());
      setNewYesDishes(await GetYesDishes());
      setNewNoDishes(await GetNoDishes());
    };
  

    return (
        <section className="mb-20 ">
          {updatedIngreds.map((ingred, index) => (
            <div className="ingred-container" key={index}>
              <h2 className="ingred-name">{ingred.name}</h2>
              <Counter
                value={ingred.quantity}
                onChangeFunc={(newQuantity) => handleQuantityChange(index, newQuantity)}
              />
            </div>
          ))}
        </section>
    );
    
}
  




type Props = {
    ingreds: Ingred[];
    yesDishes: Dish[];
    noDishes: Dish[];
}
