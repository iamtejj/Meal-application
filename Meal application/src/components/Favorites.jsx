import React from "react";
import { useGlobalContext } from "../context";

const Favorites = () => {
  const {favourites,selectedMeal,removeFromFavorites ,selecteMeal} = useGlobalContext()
  return (
    <>
      {favourites !== null && (
          <section className="favorites">
          <div className="favorites-content">
            <h5>Favorites</h5>
            <div className="favorites-container">
              {favourites.map((item)=>{
                  const {idMeal,strMealThumb:image,} = item;
                  return <div key={idMeal} className="favorite-item">
                      <img src={image} className="favorites-img img" onClick={()=>{selecteMeal(idMeal)}} />
                      <button className="remove-btn" onClick={()=> { removeFromFavorites(idMeal) }}>
                        Remove
                      </button>
                  </div>
              })}
            </div>
          </div>
         </section>
      )}
    </>
  )
    
};

export default Favorites;
