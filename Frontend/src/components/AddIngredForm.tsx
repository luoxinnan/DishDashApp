import { Props } from "./types/addIngredFormTypes";
import {useForm, FieldValues} from "react-hook-form";


export default function AddIngredForm({ func }: Props) {
    const{register,handleSubmit,formState: {errors}} = useForm({defaultValues: {foodname: ""}});


    return (
        <>
            <form onSubmit={handleSubmit(data => {func(data)})}>
                <input {...register("foodname",{required: "You forgot to give it a name"})} placeholder="Ingredience name" />
                <p>{errors.foodname?.message}</p>
                <button type="submit" className="submit-btn">Add</button>
            </form>
        </>
    )
}