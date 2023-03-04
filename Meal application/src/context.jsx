import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import Meals from "./components/Meals";

const Appcontext = createContext("");

const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomeMealUrl =
  "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [selectedMeal,setSelectedMeal] = useState(null);
  const [favourites,setFavourites] = useState([])

  const selecteMeal = (idMeal,favouriteMeal) =>{
    let meal;
    meal = meals.find((meal)=>{ return meal.idMeal == idMeal });
    
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const addToFavourites = (id) =>{
    let meal;
    meal = meals.find((meal) => meal.idMeal === id);
    let alreadyFavourite = favourites.find((meal) => meal.idMeal === id)
    if(alreadyFavourite) return;
    const updatedFavourites = [...favourites,meal]
    setFavourites(updatedFavourites);
  }

  const closeModal = () => {
    setSelectedMeal('')
    setShowModal(false)
  }
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal =()=>{
    fetchMeals(randomeMealUrl)
  }
  useEffect(() => {
    fetchMeals(`${allMealUrl}`);
  }, []);

  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <Appcontext.Provider value={{ meals, loading ,setSearchTerm ,fetchRandomMeal ,showModal , selecteMeal ,selectedMeal , closeModal ,addToFavourites ,favourites}}>
      {children}
    </Appcontext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(Appcontext);
};

export { AppProvider, Appcontext, useGlobalContext };
