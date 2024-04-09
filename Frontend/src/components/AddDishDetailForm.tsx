import { Props } from "./types/addDishDetailFormTypes";
import Counter from "./Counter"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';

export default function AddDishDetailForm(){
    return (
        <>
        <label>Dish name: </label>
        <input type="text" name="dishName" />
        <label>Ingredients: </label>
        <label>Name: </label>
        <input type="text" name="dish-ingredient-name"  />
        <label>Quantity: </label>
        <input type="text" name="dish-ingredient-quantity" />
        <button>+</button>
        <br />

        <Link to="/dishes"><button>Cancel</button></Link>
        <button>Confirm</button>
        <br />
        
        </>
    )
}