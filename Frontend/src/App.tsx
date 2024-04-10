import { FormEvent, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';
import IngredCards from './components/IngredCards';

import AddDishDetailForm from './components/AddDishDetailForm';

import NoDishCards from './components/NoDishCards';
import YesDishCards from './components/YesDishCards';
import { FieldValues } from 'react-hook-form';
import { Dish, Ingred } from './appTypes';
import { GetIngreds, PostIngred } from './services/ingredService';
import {  GetNoDishes, GetYesDishes } from './services/dishService';

// // --------temp------

// const d1 = { name: "Tomato fried egg", ingredsEnough: [{ name: "Egg", quantity: 3 }, { name: "Tomato", quantity: 1 }], ingredsNotEnough: [] }
// const d2 = { name: "Egg soup", ingredsEnough: [{ name: "Egg", quantity: 1 }],  ingredsNotEnough: [] }
// const d3 = { name: "Steak", ingredsEnough: [{ name: "Beef", quantity: 1 }], ingredsNotEnough: [] }
// const defaultYesDishes = [d1, d2];
// const defaultNoDishes = [d3];
// //-----------------

const seedIngreds = await GetIngreds();
const seedYesDishes: Dish[] = await GetYesDishes();
const seedNoDishes : Dish[]= await GetNoDishes();


export function App() {

  const [allIngreds, setAllIngreds] = useState<Ingred[]>(seedIngreds);
  const [yesDishes, setYesDishes] = useState<Dish[]>(seedYesDishes);
  const [NoDishes, setNoDishes] = useState<Dish[]>(seedNoDishes);

useEffect(() => {
  }, []); 

  async function addNewIngred(value: FieldValues) {
    const name = value.foodname;
    
    const newIngred: Ingred = { name: name, quantity: 1 }
    await PostIngred(newIngred);
    setAllIngreds(await GetIngreds());
  }

  function addDish(dishName: string, ingreds: Ingred[]) {
    // const dish: Dish = { name: dishName, ingreds: ingreds }

    /*
      1.send a http post request for adding a new dish
      2. calculate if it is a yes dish or no dish, and update state accordingly
    */


  }

  function cookAndUpdate(i: number) {
    const dish = yesDishes[i];
    const newAllIngreds = [...allIngreds];
    dish.ingredsEnough.forEach(dishIngred => {
      const ingredIndex = newAllIngreds.findIndex(ing => ing.name == dishIngred.name);
      if (ingredIndex != -1)
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
          <AddIngredForm func={addNewIngred} />
          <IngredCards ingreds={allIngreds} />
        </Route>

        <Route exact path="/dishes">
          <YesDishCards dishes={yesDishes} cookFunc={cookAndUpdate} />
          <NoDishCards dishes={NoDishes} cookFunc={cookAndUpdate} />
          <Link to="/dishes/add-dish"><button className="btn btn-primary float-right mt-10 absolute bottom-0 right-0 mb-20 mr-10">+</button></Link>
        </Route>


        <Route exact path="/dishes/add-dish">
          <AddDishDetailForm func={addDish} />
        </Route>


      </Switch>
      <div style={{ display: 'flex', width: '80%', position: 'fixed', bottom: 0 }}>
        
      </div>
      <div className="btm-nav">
        <Link to="/" >
          <button>
            <i className="fa-solid fa-carrot text-2xl" ></i>
          </button>
          <span className='text-sm'>Ingredients</span>
        </Link>
        <Link to="/dishes">
          <button className="active">
            <i className="fa-solid fa-utensils text-2xl"></i>
          </button>
          <span className='text-sm'>Dishes</span>
        </Link>
        <div >
          <button>
            <i className="fa-solid fa-gear text-2xl"></i>
          </button>
          <span className='text-sm'>Settings</span>
        </div>

        {/* <button onClick={() => setIsIngredpage(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path className={"rice-icon " + (isIngredPage ? "active" : "")} d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"/>
        </svg>
        </button> */}
        
        {/* style={{ color: "#77BFC7" }} */}
      </div>

    </Router>

  )
}

export default App
