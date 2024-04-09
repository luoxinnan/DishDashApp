import { FormEvent, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';





export function App() {

  const[ingredList, setIngredList] = useState();

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

    </>
  )
}

export default App
