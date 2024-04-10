import { useState } from "react";
import Counter from "./Counter";
import "./styles/ingredCardsStyles.css"
import { Ingred } from './appTypes';
import { DeleteIngred, GetIngreds, PutIngred } from "@/services/ingredService";

export default function IngredCards({ingreds }: Props){
    const [updatedIngreds, setUpdatedIngreds] = useState(ingreds);

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
    ingreds: Ingred[]
}
