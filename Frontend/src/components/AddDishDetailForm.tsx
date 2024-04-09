import { Props } from "./types/addDishDetailFormTypes";
import Counter from "./Counter"
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';

export default function AddDishDetailForm({dishName}: Props){
    return (
        <>
        <label>Dish name: </label>
        <input type="text" name="dishName" value={dishName} />
        <label>Ingredients: </label>
        <label>Name: </label>
        <input type="text" name="dish-ingredient-name" value={dishName} />
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