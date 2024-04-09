import { useState } from "react";
import { Props } from "./types/IngredCardsTypes";
import QuantitySpinner from "./QuantitySpinner";

export default function IngredCards({ingreds }: Props){
    const [updatedIngreds, setUpdatedIngreds] = useState(ingreds);

    function handleQuantityChange (index: number, newQuantity: number) {
      const newIngreds = [...updatedIngreds];
      newIngreds[index].quantity = newQuantity;
      setUpdatedIngreds(newIngreds);
    };
  

    return (
        <div>
          {updatedIngreds.map((ingred, index) => (
            <div key={index}>
              <h2>{ingred.name}</h2>
              <QuantitySpinner
                value={ingred.quantity}
                onChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
              />
            </div>
          ))}
        </div>
    );
    
}
  