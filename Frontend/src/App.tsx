import { FormEvent, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';
import IngredCards from './components/IngredCards';
import AddDishForm from './components/AddDishForm';
import AddDishDetailForm from './components/AddDishDetailForm';


// temp
export type Ingred = {
  name: string,
  quantity: number
}

export function App() {

  const [ingreds, setIngreds] = useState([
    { name: "Tomato", quantity: 1 },
    { name: "Egg", quantity: 4 },
    { name: "Spring onion", quantity: 3 }
  ]);
  const [tempdishName, setTempDishName] = useState<string>("");



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

  function addDishToList(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('dish-name') as string;

  }




  return (

    <Router>
      <Switch>

        <Route exact path="/">
          <AddIngredForm func={addIngredToList} />
          <IngredCards ingreds={ingreds} />
        </Route>

        <Route exact path="/dishes">
          <AddDishForm func={addDishToList} />
        </Route>


        <Route exact path="/dishes/add-dish">
          <AddDishDetailForm dishName={tempdishName} />
        </Route>


      </Switch>
      <Link to="/">Ingredients </Link>
      <Link to="/dishes">Dishes</Link>
    </Router>

  )
}

export default App
