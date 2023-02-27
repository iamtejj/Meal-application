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
  const [searchTerm,setSearchTerm] = useState('')
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
    fetchMeals(`${allMealUrl}${searchTerm}`);
  }, [searchTerm]);
  return (
    <Appcontext.Provider value={{ meals, loading ,setSearchTerm ,fetchRandomMeal}}>
      {children}
    </Appcontext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(Appcontext);
};

export { AppProvider, Appcontext, useGlobalContext };
