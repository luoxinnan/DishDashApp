
import { FormEvent } from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default function AddIngredForm({ func }: Props) {
    return (
        <>
            <form onSubmit={func}>
                <input type="text" placeholder="Add a dish" name="dish-name" required />
                <Link to="/dishes/add-dish">
                    <button type="submit" className="submit-btn">Add</button>
                </Link>
            </form>
        </>
    )
}



export type Props = {
    func : (event: FormEvent<HTMLFormElement>) => void;
}