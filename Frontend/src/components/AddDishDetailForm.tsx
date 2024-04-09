import { Props } from "./types/addDishDetailFormTypes";
import Counter from "./Counter"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';

export default function AddDishDetailForm() {
    return (
        <div>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dish name: </label>
                    <input type="text" name="dishName" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <label>Ingredients: </label>
                <section className="ingred-form">
                    <div className="mb-5 ingred-form__name">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: </label>
                        <input type="text" name="dish-ingredient-name" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-5 ingred-form__quantity">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity: </label>
                        <input type="text" name="dish-ingredient-quantity" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button className="ingred-form__add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</button>
                </section>
            </form>
            <br />

            <Link to="/dishes"><button>Cancel</button></Link>
            <button >Confirm</button>
            <br />


        </div>
    )
}