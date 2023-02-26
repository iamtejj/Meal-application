import React, { createContext, useContext ,useEffect, useState} from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import Meals from './components/Meals';

const Appcontext = createContext('')

const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomeMealUrl = 'https://www.themealdb.com/api/json/v1/1/randomselection.php'



const AppProvider = ({children}) =>{
    const [meals,setMeals] = useState([]);
    const fetchMeals = async (url) =>{
        try {
            const {data} = await axios.get(url);
            setMeals(data.meals)
               
          } catch (error) {
            console.error(error);
          }
        
    }

    useEffect(()=>{
        fetchMeals(allMealUrl)
         
    },[])
    return(
            <Appcontext.Provider value={{meals}}>
                {children}
            </Appcontext.Provider>
        )
}

const useGlobalContext = () =>{
    return useContext(Appcontext)
}

export {AppProvider, Appcontext ,useGlobalContext}