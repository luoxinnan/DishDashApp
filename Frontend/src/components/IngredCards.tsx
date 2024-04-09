import { useState } from "react";
import { Props } from "./types/IngredCardsTypes";
import Counter from "./Counter";

export default function IngredCards({ingreds }: Props){
    const [updatedIngreds, setUpdatedIngreds] = useState(ingreds);

    function handleQuantityChange (index: number, newQuantity: number) {
      const newIngreds = [...updatedIngreds];
      newIngreds[index].quantity = newQuantity;
      // TODO: send a http put request to change corespondent quantity, default is 0
      setUpdatedIngreds(newIngreds);
    };
  

    return (
        <div>
          {updatedIngreds.map((ingred, index) => (
            <div key={index}>
              <h2>{ingred.name}</h2>
              <Counter
                value={ingred.quantity}
                onChangeFunc={(newQuantity) => handleQuantityChange(index, newQuantity)}
              />
            </div>
          ))}
        </div>
    );
    
}
  