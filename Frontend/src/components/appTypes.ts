export type Ingred = {
    name: string,
    quantity: number
  }
  
  export type Dish = {
    name: string;
    ingreds: Ingred[];
  }