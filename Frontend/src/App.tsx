import { FormEvent, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';
import IngredCards from './components/IngredCards';


// temp
export type Ingred = {
  name: string,
  quantity: number
}


export function App() {

  const[ingreds, setIngreds] = useState([
    {name: "Tomato", quantity: 1},
    {name: "Egg", quantity: 4},
    {name: "Spring onion", quantity: 3}
  ]);
  

  function addIngredToList(event: FormEvent<HTMLFormElement>){
    event?.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('ingred-name') as string;

    /* TODO:
      - Send post reequest
      - Alert added
      - setIngredList for update
    */
  }




  return (
    <>
    <AddIngredForm func={addIngredToList}/>
    <IngredCards ingreds={ingreds}/>


    </>
  )
}

export default App
