import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import Meals from "./components/Meals";

const Appcontext = createContext("");

const allMealUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomeMealUrl =
  "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites')
  let localFavorites;
  if(favorites){
    localFavorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else{
    localFavorites =[]
  }
  return localFavorites
}  

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [selectedMeal,setSelectedMeal] = useState(null);
  const [favourites,setFavourites] = useState(getFavoritesFromLocalStorage())

  const selecteMeal = (idMeal,favouriteMeal) =>{
    let meal;
    if(favouriteMeal){
      meal = favourites.find((meal)=>{ return meal.idMeal == idMeal });  
    }
    else{
      meal = meals.find((meal)=>{ return meal.idMeal == idMeal });
    }
    
    
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const addToFavourites = (id) =>{
    let meal;
    let alreadyFavourite = favourites.find((meal) => meal.idMeal === id)
    if(alreadyFavourite) return;
    meal = meals.find((meal) => meal.idMeal === id);
    const updatedFavourites = [...favourites,meal]
    setFavourites(updatedFavourites);
    localStorage.setItem('favorites',JSON.stringify(updatedFavourites))
  }
  const removeFromFavorites = (idMeal) =>{
    const updateFavorites = favourites.filter((meal) => meal.idMeal !== idMeal);
    setFavourites(updateFavorites);
    localStorage.setItem('favorites',JSON.stringify(updateFavorites))

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
    <Appcontext.Provider value={{ meals, loading ,setSearchTerm ,fetchRandomMeal ,showModal , selecteMeal ,selectedMeal , closeModal ,addToFavourites ,favourites ,removeFromFavorites}}>
      {children}
    </Appcontext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(Appcontext);
};

export { AppProvider, Appcontext, useGlobalContext };
