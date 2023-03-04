import React, { useState } from "react";
import { useGlobalContext } from "../context";


const Search = () => {
  const [text,setText] = useState('');
  const {setSearchTerm ,fetchRandomMeal} = useGlobalContext()
  const handleChange = (event) =>{
    setText(event.target.value)
  } 
  const handleSubmit = (event) =>{
    event.preventDefault();
    if(text){
      setSearchTerm(text)
    }
  }
  const handleRandomMela = () =>{
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }
  return <header className="search-container">
    <form onSubmit={handleSubmit}>
      <input className="form-input" type="text" value={text} placeholder="Type Your favourite Meal" onChange={handleChange} />
      <button className="btn" type="submit" >Search</button>
      <button className="btn btn-hipster" onClick={(e)=>{
        e.preventDefault(); 
        handleRandomMela()
        }
        } type="submit">Surprice me!</button>
    </form>

  </header>;
};

export default Search;
