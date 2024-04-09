import { useState } from "react";
import Counter from "./Counter";
import "./styles/ingredCardsStyles.css"
import { Ingred } from './appTypes';

export default function IngredCards({ingreds }: Props){
    const [updatedIngreds, setUpdatedIngreds] = useState(ingreds);

    function handleQuantityChange (index: number, newQuantity: number) {
      const newIngreds = [...updatedIngreds];
      newIngreds[index].quantity = newQuantity;
      // TODO: send a http put request to change corespondent quantity, default is 0
      setUpdatedIngreds(newIngreds);
    };
  

    return (
        <section>
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
