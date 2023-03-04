import React from "react";
import { useGlobalContext } from "../context";


const Modal = () => {
  const {selectedMeal ,closeModal ,addToFavourites} = useGlobalContext();
  const { strMealThumb: image, strMeal:title ,strInstructions:text ,strSource: source } = selectedMeal
  return <aside className="modal-overlay">
    <div className="modal-container">
      {selectedMeal && (
        <>
        <img src={image} className="img modal-img" />
          <div className="modal-content">
            <h4>{title}</h4>
            <p>Coocking Instruction</p>
            <p>{text}</p>
            <a href={source} target="_blank" >Original Source</a>
            <button className="btn btn-hipster close-btn" onClick={() => { addToFavourites()}}>
              close
            </button>
          </div>
        </>
      )
      }
    </div>
  </aside>;
};

export default Modal;
