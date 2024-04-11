import { FormEvent, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import AddIngredForm from './components/AddIngredForm';
import IngredCards from './components/IngredCards';

import AddDishDetailForm from './components/AddDishDetailForm';

import NoDishCards from './components/NoDishCards';
import YesDishCards from './components/YesDishCards';
import { FieldValues } from 'react-hook-form';
import { Dish, Ingred } from './appTypes';
import { GetIngreds, PostIngred, PutIngred } from './services/ingredService';
import {  GetDishes, GetNoDishes, GetYesDishes, PostDish, deleteDish } from './services/dishService';
import Navbar from './components/Navbar';
import ShopList from './components/ShopList';


const seedIngreds = await GetIngreds();
const seedYesDishes: Dish[] = await GetYesDishes();
const seedNoDishes : Dish[]= await GetNoDishes();


export function App() {

  const [allIngreds, setAllIngreds] = useState<Ingred[]>(seedIngreds);
  const [yesDishes, setYesDishes] = useState<Dish[]>(seedYesDishes);
  const [noDishes, setNoDishes] = useState<Dish[]>(seedNoDishes);

useEffect(() => {
  }, []); 

  async function addNewIngred(value: FieldValues) {
    const name = value.foodname;
    
    const newIngred: Ingred = { name: name, quantity: 1 }
    await PostIngred(newIngred);
    setAllIngreds(await GetIngreds());

    setYesDishes(await GetYesDishes());
    setNoDishes(await GetNoDishes());
  }

  async function addDish(dishName: string, ingreds: Ingred[]) {
    
    await PostDish(dishName, ingreds);
    console.table(await GetDishes())
    setYesDishes(await GetYesDishes());
    setNoDishes(await GetNoDishes());

  }

  async function cookAndUpdate(i: number) {
    const dish = yesDishes[i];
    let newAllIngreds = [...allIngreds];
    dish.ingredsEnough.forEach(async dishIngred => {
      const ingredIndex = newAllIngreds.findIndex(ing => ing.name == dishIngred.name);
      if (ingredIndex != -1){
        const ingred = newAllIngreds[ingredIndex]
        ingred.quantity -= dishIngred.quantity;
        if(ingred.quantity == 0)
          newAllIngreds  = newAllIngreds.filter(ing => ing.name != ingred.name);

        await PutIngred(dishIngred.name, newAllIngreds[ingredIndex].quantity)
      }
    });

    setAllIngreds(newAllIngreds);
    setYesDishes(await GetYesDishes());
    setNoDishes(await GetNoDishes());
  }

  async function deleteDishFromYesDishs(i: number){
    const dish = yesDishes[i];
    await deleteDish(dish.name);
    setYesDishes(await GetYesDishes());
    setNoDishes(await GetNoDishes());
  }

  async function deleteDishFromNoDishs(i: number){
    const dish = noDishes[i];
    await deleteDish(dish.name);
    setYesDishes(await GetYesDishes());
    setNoDishes(await GetNoDishes());
  }




  return (

    <Router>
      <Switch>

        <Route exact path="/">
          <AddIngredForm func={addNewIngred} />
          <IngredCards ingreds={allIngreds} yesDishes={yesDishes} noDishes={noDishes} />
        </Route>

        <Route exact path="/dishes">
          <YesDishCards dishes={yesDishes} cookFunc={cookAndUpdate} deleteFunc={deleteDishFromYesDishs} />
          <NoDishCards dishes={noDishes} cookFunc={cookAndUpdate} deleteFunc={deleteDishFromNoDishs}/>
          <Link to="/dishes/add-dish">
          <div className="tooltip float-right mt-10 absolute bottom-0 right-0 mb-20 mr-10" data-tip="Add a new dish">
            <button className="btn btn-primary ">+</button>
          </div>
            </Link>
        </Route>


        <Route exact path="/dishes/add-dish">
          <AddDishDetailForm func={addDish} />
        </Route>

        <Route exact path="/shoplist">
          <ShopList />
        </Route>

      </Switch>
      <Navbar />


    </Router>

  )
}

export default App
