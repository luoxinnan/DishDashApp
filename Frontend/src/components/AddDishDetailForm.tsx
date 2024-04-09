
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from "react";
import { Ingred } from "@/App";
import { Button, buttonVariants } from "@/components/ui/button"


type Props = {
    func: (dishName: string, ingreds: Ingred[]) => void;
}

export default function AddDishDetailForm({func}: Props) {
    const [ingredForms, setIngredForms] = useState<Ingred[]>([])
    const [dishName, setDishName] = useState<string>("");

    function addIngredForm(){
        const newIngredForms = [...ingredForms, {name: "", quantity: 0}]
        setIngredForms(newIngredForms);
    }

    function addNameToIngred(name:string, i:number){
        const newIngredForms = [...ingredForms];
        newIngredForms[i].name = name;
        setIngredForms(newIngredForms);
    }

    function addQuantityToIngred(quantity: string, i:number){
        const newIngredForms = [...ingredForms];
        newIngredForms[i].quantity = Number(quantity);
        setIngredForms(newIngredForms);
    }

    function changeDishName(name: string){
        setDishName(name);
    }

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label>Dish name </label>
                    <input type="text" name="dishName" placeholder="Type here"  onChange = {event => changeDishName(event.target.value)} className="input input-bordered w-full max-w-xs" />
                </div>
                <label>Ingredients </label>
                <button className='btn btn-primary btn-sm' type="button" onClick= {addIngredForm}> + </button>
                <section className="ingred-form">
                    {
                        ingredForms.map((ingred, i) =>
                            <div className='add-ingred flex items-center mt-4 mb-4'>
                                <div className="mb-1 ingred-form__name flex-grow w-80 mr-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
                                    <input type="text" name="dish-ingredient-name" onChange={event => addNameToIngred(event.target.value, i)}className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="mb-1 ingred-form__quantity">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity: </label>
                                    <input type="text" name="dish-ingredient-quantity" onChange={event => addQuantityToIngred(event.target.value, i)} className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>

                        )

                        
                    }
                    
                </section>
            </form>
            <br />

            <Link to="/dishes"><button className='btn btn-neutral btn-sm mr-2 w-20'>Cancel</button></Link>
            {/* <button type="submit" onClick={()=> func(dishName, ingredForms)}>Confirm</button> */}
            <button type="submit" onClick={()=> func(dishName, ingredForms)} className='btn btn-neutral btn-sm mr-2 w-20'> Confirm</button>
            <br />
            
            <div style={{fontSize: 10, color: 'gray'}}>
                <p>----------for testing----------</p>
                <p>Dish: {dishName}</p>
                {
                    ingredForms.map((ingred) => <p>{ingred.name}, {ingred.quantity}</p>)
                }
                <p>---------------------------------</p>
            </div>


        </div>
    )
}