import { Props } from "./types/addIngredFormTypes";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import "./styles/addIngredFormStyles.css"

export default function AddIngredForm({ func }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { foodname: "" } });


    return (
        <>
            <form onSubmit={handleSubmit(data => { func(data) })}>
                {/* daisy ui alert: */}
                {errors.foodname && errors.foodname.message !== "" && (
                   <div role="alert" className="alert alert-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                   <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-red-500 mr-2 h-4 w-4 absolute left-0 top-0 mt-2 ml-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   <span className="block sm:inline">{errors.foodname.message}</span>
               </div>
                )}
                <div className="add-ingred">
                    {/* <Input className="add-ingred-input"{...register("foodname", { required: "You forgot to give it a name" })} placeholder="ingredient" /> */}
                    <input type="text" {...register("foodname", { required: "You forgot to give it a name" })} placeholder="Ingredient name" className="add-ingred-input input input-bordered w-full max-w-xs" />
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </>
    )
}