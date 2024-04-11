export type Ingred = {
    name: string,
    quantity: number
    imgAddress?: string
  }
  
  export type Dish = {
    name: string;
    ingredsEnough: Ingred[];
    ingredsNotEnough?: Ingred[];
  }