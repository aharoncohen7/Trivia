import React from 'react'
import { useTriviaStore } from '../stores';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


const Favorites = () => {
  const favorites = useTriviaStore(state => state.favorites);
  const removeFavorite = useTriviaStore(state => state.removeFavorite);
  const primaryColor = useTriviaStore(state => state.primaryColor);
  const darkMode = useTriviaStore(state => state.darkMode);
  // console.log("🚀 ~ Favorites ~ primaryColor:", primaryColor);
  console.log("🚀 ~ Favorites ~ favorites:", favorites)
  // console.log("🚀 ~ Favorites ~ myFavorites:", myFavorites)



  // מחיקת תוים מיותרים
  const convert = (str) => {
    const txt = document.createElement("textarea")
    txt.innerHTML = str;
    return txt.value;
  }


  return (
    <div>
      <span className='flex py-8 px-12 gap-2 font-semibold text-md'><h1 >Favorites </h1><FaStar s color='gold'/></span>
      {favorites.map(favor => {
        // console.log(favor)

        return <div key={favor} className={`flex justify-between border border-${darkMode ? "white" : "black"} p-4 rounded-xl shadow-xl text-semibold`}>
          <span className='flex'>
            <p>{favor.split(" :: ")[0]}  ➡️ </p>  
            <p className='text-green-600 font-semibold text-md'>{favor.split(" :: ")[1]}</p>  
          </span>

          <button style={{ backgroundColor: primaryColor }} className='p-4 rounded-md' onClick={() => removeFavorite(convert(favor))}>Remove</button>
        </div>
      })}



    </div>
  )
}

export default Favorites
