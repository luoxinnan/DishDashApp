import { Dish } from '../appTypes';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {useState } from "react";



export default function DishCard({ dish, cookFunc, i, canCook, deleteFunc }: dishCardProps) {
    const [cookedAlert, setCookedAlert] = useState<boolean>(false);
    const [deletedAlert, setDeletedAlert] = useState<boolean>(false);

    async function handleClickCook(i: number) {
        setCookedAlert(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await cookFunc(i);
        setCookedAlert(false);
    }

    async function handleClickDelete(i: number) {
        setDeletedAlert(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDeletedAlert(false)
        await deleteFunc(i);
    }

    async function revertDelete(i: number){
        // await revertDeleteFunc(i);
    }



    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{dish.name}</AccordionTrigger>
                {dish.ingredsEnough.map(ingred => (
                    <AccordionContent>{ingred.name}: {ingred.quantity}</AccordionContent>
                ))}
                {dish.ingredsNotEnough.map(ingred => (
                    <AccordionContent style={{ color: 'rgb(173, 196, 206)' }}>
                        {ingred.name}: {ingred.quantity}
                        <a>
                            <button className="btn btn-xs btn-outline btn-primary flex-1 ml-3">+</button>
                        </a>
                    </AccordionContent>

                ))}
                {canCook ? (
                    <>
                        <AccordionContent>
                            <button onClick={() => handleClickCook(i)} className="btn btn-xs btn-outline btn-primary flex-1 w-12 mr-2">Cook</button>
                            <button onClick={() => handleClickDelete(i)} className="btn btn-xs btn-outline btn-error flex-1 w-12 mr-2">Delete</button>
                            <a href="https://www.youtube.com/@chefwang" className="link link-neutral ml-10 hover:text-teal-500">Go to recipe  &rarr; </a>
                        </AccordionContent>
                    </>
                ) : <>
                    <AccordionContent>
                        <button className="btn btn-xs btn-active btn-ghost flex-1 w-12 mr-2">Cook</button>
                        <button onClick={() => handleClickDelete(i)} className="btn btn-xs btn-outline btn-error flex-1 w-12 mr-2">Delete</button>
                        <a href="https://www.youtube.com/@chefwang" className="link link-neutral ml-10 hover:text-teal-500">Go to recipe  &rarr; </a>
                    </AccordionContent>
                </>}
                {cookedAlert && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-2">
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="">Have a nice meal!</span>
                        </div>
                    </div>
                )}
                {deletedAlert && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="">Dish deleted! <a><button onClick={() => revertDelete(i)}className="btn btn-active btn-outline btn-xs ml-4">Revert</button></a></span>
                        </div>
                    </div>
                )}
            </AccordionItem>
        </Accordion>
    )
}

type dishCardProps = {
    dish: Dish;
    cookFunc: (i: number) => void;
    deleteFunc: (i: number) => void;
    i: number;
    canCook: boolean;
    // revertDeleteFunc: (i: number) => void
}