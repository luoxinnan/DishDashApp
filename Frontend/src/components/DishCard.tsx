import { Dish } from "../App";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export default function DishCard({ dish }: dishCardProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{dish.name}</AccordionTrigger>
                {dish.ingreds.map(ingred => (
                    <AccordionContent>{ingred.name}: {ingred.quantity}</AccordionContent>
                ))}
            </AccordionItem>
        </Accordion>
    )
}

type dishCardProps = {
    dish: Dish;
}