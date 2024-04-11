
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import "./styles/addIngredFormStyles.css"
import { useState } from "react";


export default function AddIngredForm({ func }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { foodname: "" } });
    const [showGoodAlert, setShowGoodAlert] = useState<boolean>(false);
    const [showExistAlert, setShowExistAlert] = useState<boolean>(false);

    async function handleConfirm(data: FieldValues) {
        const response = await fetch(`http://localhost:5279/api/Ingredient/NameExists?name=${data.foodname}`);
        if (response.ok) {
            const exists = await response.json();
            if (exists) {
                setShowExistAlert(true);
                setTimeout(() => setShowExistAlert(false), 1000);
            } else {
                func(data);
                setShowGoodAlert(true);
                setTimeout(() => setShowGoodAlert(false), 1000);
            }
        } else {
            console.error("Failed to check if foodname exists");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(data => { handleConfirm(data) })}>
                {/* daisy ui alert: */}
                {errors.foodname && errors.foodname.message !== "" && (
                    <div role="alert" className="alert alert-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-red-500 mr-2 h-4 w-4 absolute left-0 top-0 mt-2 ml-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="block sm:inline">{errors.foodname.message}</span>
                    </div>
                )}
                {showGoodAlert && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
                        <div role="alert" className="alert alert-success w-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                )}
                {showExistAlert && (
                    <div role="alert" className="alert alert-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-red-500 mr-2 h-4 w-4 absolute left-0 top-0 mt-2 ml-2" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="block sm:inline">Name already exists</span>
                    </div>
                )}
                <div className="add-ingred">
                    {/* <Input className="add-ingred-input"{...register("foodname", { required: "You forgot to give it a name" })} placeholder="ingredient" /> */}
                    <input type="text" {...register("foodname", { required: "You forgot to give it a name" })} placeholder="Ingredient name" className="add-ingred-input input input-bordered w-full max-w-xs" />
                    <div className="tooltip" data-tip="Add a new ingredient">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </>
    )
}



export type Props = {
    func: (value: FieldValues) => void;
}