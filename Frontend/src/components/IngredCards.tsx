import { useState } from "react";
import Counter from "./Counter";
import "./styles/ingredCardsStyles.css"
import { Ingred } from './appTypes';
import { PutIngred } from "@/services/ingredService";

export default function IngredCards({ingreds }: Props){
    const [updatedIngreds, setUpdatedIngreds] = useState(ingreds);

    async function handleQuantityChange (index: number, newQuantity: number) {
      const newIngreds = [...updatedIngreds];
      newIngreds[index].quantity = newQuantity;
      await PutIngred(newIngreds[index]);
      setUpdatedIngreds(newIngreds);
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
