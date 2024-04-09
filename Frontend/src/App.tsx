import { FormEvent, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';
import IngredCards from './components/IngredCards';
import AddDishForm from './components/AddDishForm';
import AddDishDetailForm from './components/AddDishDetailForm';

import NoDishCards from './components/NoDishCards';
import YesDishCards from './components/YesDishCards';


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

const d1 = {name: "Tomato fried egg", ingreds: defaultIngreds}
const d2 = {name: "Egg soup", ingreds: [{name: "Egg", quantity: 1}]}
const d3 = {name: "Steak", ingreds: [{name: "Beef", quantity: 1}]}
const defaltYesDishes = [d1,d2];
const defaltNoDishes = [d3];

//-----------------

export function App() {

  const [allIngreds, setAllIngreds] = useState<Ingred[]>(defaultIngreds);
  const[yesDishes, setYesDishes] = useState<Dish[]>(defaltYesDishes);
  const[NoDishes, setNoDishes] = useState<Dish[]>(defaltNoDishes);



  function addIngredToList(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('ingred-name') as string;

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
   // for test:
   const newNoDishes = [...NoDishes,dish];
   setNoDishes(newNoDishes)

  }




  return (

    <Router>
      <Switch>

        <Route exact path="/">
          <AddIngredForm func={addIngredToList} />
          <IngredCards ingreds={allIngreds} />
        </Route>

        <Route exact path="/dishes">
          <Link to="/dishes/add-dish"><button>Add</button></Link>
          <YesDishCards dishes={yesDishes}/>
          <NoDishCards dishes = {NoDishes} />
        </Route>


        <Route exact path="/dishes/add-dish">
          <AddDishDetailForm func={addDish}/>
        </Route>


      </Switch>
      <Link to="/">Ingredients </Link>
      <Link to="/dishes">Dishes</Link>
    </Router>

  )
}

export default App
