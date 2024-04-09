import { Props } from "./types/addIngredFormTypes";

export default function AddIngredForm({ func }: Props) {
    return (
        <>
            <form onSubmit={func}>
                <input type="text" placeholder="Add an ingredient" name="ingred-name" required />
                <button type="submit" className="submit-btn">Add</button>
            </form>
        </>
    )
}