
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from "react";
import { Ingred } from '../appTypes';


type Props = {
    func: (dishName: string, ingreds: Ingred[]) => void;
}



export default function AddDishDetailForm({ func }: Props) {
    const [ingredForms, setIngredForms] = useState<Ingred[]>([])
    const [dishName, setDishName] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    function addIngredForm() {
        const newIngredForms = [...ingredForms, { name: "", quantity: 0 }]
        setIngredForms(newIngredForms);
    }

    function addNameToIngred(name: string, i: number) {
        const newIngredForms = [...ingredForms];
        newIngredForms[i].name = name;
        setIngredForms(newIngredForms);
    }

    function addQuantityToIngred(quantity: string, i: number) {
        const newIngredForms = [...ingredForms];
        newIngredForms[i].quantity = Number(quantity);
        setIngredForms(newIngredForms);
    }

    function changeDishName(name: string) {
        setDishName(name);
    }

    function handleConfirm() {
        func(dishName, ingredForms);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    }

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label>Dish name </label>
                    <input type="text" name="dishName" placeholder="Type here" onChange={event => changeDishName(event.target.value)} className="input input-bordered w-full max-w-xs" />
                </div>
                <label>Ingredients </label>
                <button className='btn btn-primary btn-sm ml-3 w-30' type="button" onClick={addIngredForm}> + </button>
                <section className="ingred-form">
                    {
                        ingredForms.map((ingred, i) =>
                            <div className='add-ingred flex items-center mt-4 mb-4'>
                                <div className="mb-1 ingred-form__name flex-grow w-80 mr-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
                                    <input type="text" name="dish-ingredient-name" onChange={event => addNameToIngred(event.target.value, i)} className="input input-bordered w-full max-w-xs" />
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
            <button type="submit" onClick={handleConfirm} className='btn btn-neutral btn-sm mr-2 w-20'> Confirm</button>
            {showAlert && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Your dish has been added!</span>
                    </div>
                </div>
            )}
            <br />

            {/* <div style={{ fontSize: 10, color: 'gray' }}>
                <p>----------for testing----------</p>
                <p>Dish: {dishName}</p>
                {
                    ingredForms.map((ingred) => <p>{ingred.name}, {ingred.quantity}</p>)
                }
                <p>---------------------------------</p>
            </div> */}


        </div>
    )
}