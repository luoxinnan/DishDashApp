import { Dish } from '../appTypes';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useState } from "react";



export default function DishCard({ dish, cookFunc, i, canCook }: dishCardProps) {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    function handleClickCook(i: number) {
        cookFunc(i);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    }


    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{dish.name}</AccordionTrigger>
                {dish.ingredsEnough.map(ingred => (
                    <AccordionContent>{ingred.name}: {ingred.quantity}</AccordionContent>
                ))}
                {dish.ingredsNotEnough.map(ingred => (
                    <AccordionContent style={{ color: 'rgb(173, 196, 206)' }}>{ingred.name}: {ingred.quantity}</AccordionContent>
                ))}
                {canCook ? (
                    <AccordionContent><button onClick={() => handleClickCook(i)} className="btn btn-xs btn-outline btn-primary">Cook</button></AccordionContent>
                ) : null}
                {showAlert && (
                    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-2">
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="">Have a nice meal!</span>
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
    i: number;
    canCook: boolean;
}