import { Dish } from "../App";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"



export default function DishCard({ dish, func,i , canCook}: dishCardProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{dish.name}</AccordionTrigger>
                {dish.ingreds.map(ingred => (
                    <AccordionContent>{ingred.name}: {ingred.quantity}</AccordionContent>
                ))}
                {canCook ? (
                    <AccordionContent><button onClick={() => func(i)} className="btn btn-xs btn-outline btn-primary">Cook</button></AccordionContent>
                ) : null}
            </AccordionItem>
        </Accordion>
    )
}

type dishCardProps = {
    dish: Dish;
    func: (i: number) => void;
    i: number;
    canCook: boolean;
}