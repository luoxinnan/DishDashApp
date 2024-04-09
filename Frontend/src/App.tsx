import { FormEvent, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';
import IngredCards from './components/IngredCards';
import AddDishForm from './components/AddDishForm';
import { buttonVariants } from "@/components/ui/button"

import AddDishDetailForm from './components/AddDishDetailForm';

import NoDishCards from './components/NoDishCards';
import YesDishCards from './components/YesDishCards';
import { FieldValues } from 'react-hook-form';


// --------temp------
export type Ingred = {
  name: string,
  quantity: number
}

export type Dish = {
  name: string;
  ingreds: Ingred[];
}
const defaultIngreds: Ingred[] = [
  { name: "Tomato", quantity: 1 },
  { name: "Egg", quantity: 4 },
  { name: "Spring onion", quantity: 3 }
];

const d1 = {name: "Tomato fried egg", ingreds: [{name: "Egg", quantity: 3}, {name:"Tomato", quantity:1}]}
const d2 = {name: "Egg soup", ingreds: [{name: "Egg", quantity: 1}]}
const d3 = {name: "Steak", ingreds: [{name: "Beef", quantity: 1}]}
const defaltYesDishes = [d1,d2];
const defaltNoDishes = [d3];

//-----------------

export function App() {

  const [allIngreds, setAllIngreds] = useState<Ingred[]>(defaultIngreds);
  const[yesDishes, setYesDishes] = useState<Dish[]>(defaltYesDishes);
  const[NoDishes, setNoDishes] = useState<Dish[]>(defaltNoDishes);



  function addIngredToList(value: FieldValues) {
    const newIngred: Ingred = {name: value.foodname, quantity:0}
    const newAllIngreds = [...allIngreds, newIngred]
    setAllIngreds(newAllIngreds);
    console.table(allIngreds);

    /* TODO:
      - Send post reequest (name and quantity 0)
      - Alert added
      - setIngredList for update
    */
  }

  function addDish(dishName: string, ingreds: Ingred[]) {
    const dish: Dish = {name: dishName, ingreds: ingreds}
    /*
      1.send a http post request for adding a new dish
      2. calculate if it is a yes dish or no dish, and update state accordingly
    */
   // --------for test--------
   const newNoDishes = [...NoDishes,dish];
   setNoDishes(newNoDishes)
   //------------------------
   
   
  }

  function cookAndUpdate(i: number){
    const dish = yesDishes[i];
    const newAllIngreds = [...allIngreds];
    dish.ingreds.forEach(dishIngred => {
      const ingredIndex = newAllIngreds.findIndex(ing => ing.name == dishIngred.name);
      if(ingredIndex != -1)
        newAllIngreds[ingredIndex].quantity -= dishIngred.quantity;
    });

    setAllIngreds(newAllIngreds);
    // TODO: patch request
    // TODO: check if the dish is still a yes dish, move it accordingly, and rerender the page

  }




  return (

    <Router>
      <Switch>

        <Route exact path="/">
          <AddIngredForm func={addIngredToList} />
          <IngredCards ingreds={allIngreds} />
        </Route>

        <Route exact path="/dishes">
          <YesDishCards dishes={yesDishes} cookFunc={cookAndUpdate}/>
          <NoDishCards dishes = {NoDishes} cookFunc={cookAndUpdate} />
          <Link to="/dishes/add-dish"><button className="btn btn-primary float-right mt-10 absolute bottom-0 right-0 mb-20 mr-10">+</button></Link>
        </Route>


        <Route exact path="/dishes/add-dish">
          <AddDishDetailForm func={addDish}/>
        </Route>


      </Switch>
      <div style={{display: 'flex', width: '80%', position: 'fixed', bottom: 0}}>
        <Link to="/" className={buttonVariants({ variant: "outline" })}>Ingredients </Link>
        <Link to="/dishes" className={buttonVariants({ variant: "outline" })}>Dishes</Link>
      </div>
    </Router>

  )
}

export default App
