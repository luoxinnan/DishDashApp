
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from "react";
import { Ingred } from "@/App";

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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dish name: </label>
                    <input type="text" name="dishName" onChange = {event => changeDishName(event.target.value)}className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <label>Ingredients: </label>
                <section className="ingred-form">
                    {
                        ingredForms.map((ingred, i) =>
                            <>
                                <div className="mb-5 ingred-form__name">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
                                    <input type="text" name="dish-ingredient-name" onChange={event => addNameToIngred(event.target.value, i)}className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div className="mb-5 ingred-form__quantity">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity: </label>
                                    <input type="text" name="dish-ingredient-quantity" onChange={event => addQuantityToIngred(event.target.value, i)}className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                
                                
                            </>

                        )

                        
                    }
                    <button onClick= {addIngredForm} type="button" className="ingred-form__add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</button>
                </section>
            </form>

            <p>----------for testing----------</p>
            <p>Dish: {dishName}</p>
            {
                ingredForms.map((ingred) => <p>{ingred.name}, {ingred.quantity}</p>)
            }
            <p>-------------------------------</p>



            <br />

            <Link to="/dishes"><button>Cancel</button></Link>
            <button type="submit" onClick={()=> func(dishName, ingredForms)}>Confirm</button>
            <br />


        </div>
    )
}