import { Dispatch, SetStateAction, useState } from "react";
import Counter from "./Counter";
import "./styles/ingredCardsStyles.css"
import { Dish, Ingred } from '../appTypes';
import { DeleteIngred, GetIngreds, PutIngred } from "@/services/ingredService";
import { GetNoDishes, GetYesDishes } from "@/services/dishService";


export default function IngredCards({allIngreds, setAllIngreds,yesDishes, setYesDishes,noDishes, setNoDishes }: Props){

    async function handleQuantityChange (index: number, newQuantity: number) {
      const newIngreds = [...allIngreds];
      const ingredToChange = newIngreds[index];

      if(newQuantity == 0){
        await DeleteIngred(ingredToChange.name)
      }else{
        ingredToChange.quantity = newQuantity;
        await PutIngred(ingredToChange.name, ingredToChange.quantity);
      }
      setAllIngreds(await GetIngreds());
      setYesDishes(await GetYesDishes());
      setNoDishes(await GetNoDishes());
    };
  

    return (
        <section className="mb-20 ">
          {allIngreds.map((ingred, index) => (
            <div className="ingred-container" key={index}>
              <img src={ingred.imgAddress} alt="Tomato" className="size-8 mr-3"/>
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
    allIngreds: Ingred[];
    setAllIngreds: Dispatch<SetStateAction<Ingred[]>>
    yesDishes: Dish[];
    setYesDishes: Dispatch<SetStateAction<Dish[]>>
    noDishes: Dish[];
    setNoDishes: Dispatch<SetStateAction<Dish[]>>
}
