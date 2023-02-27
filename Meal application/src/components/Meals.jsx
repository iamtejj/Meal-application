import React, { useContext } from "react";
import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from 'react-icons/bs';
const Meals = () => {
  const { meals , loading } = useGlobalContext();

  if(loading){
    return <section className="section">
      <h4>loading...</h4>
    </section>
  }
  if(meals.length < 1){
    return <section className="section">
    <h4>No Meal match your search term. Please try again....</h4>
  </section>
  }

  return (
    <section className="section-center">
     
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
        return (
          <article key={idMeal} className="single-meal">
            <img src={image} style={{ width: "100%" }} className="img" />
            <footer>
              <h5>{title}</h5>
              
              <button className="like-btn">   <BsHandThumbsUp /></button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
