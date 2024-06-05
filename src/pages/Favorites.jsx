import React from 'react'
import { useTriviaStore } from '../stores';
import { NavLink, useNavigate } from 'react-router-dom';


const Favorites = () => {
  const favorites = useTriviaStore(state => state.favorites2);
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
      <NavLink to={"home"}><button style={{ backgroundColor: primaryColor }} className='w-full p-4 rounded-md' >Go home ➡️ </button></NavLink>
      <NavLink to={"play"}><button style={{ backgroundColor: primaryColor }} className='w-full p-4 rounded-md'>Play ▶️</button></NavLink>
      {favorites && favorites.map(favor => {
        console.log(favor)

        return <div key={favor} className={`border border-${darkMode ? "white" : "black"} p-4 rounded-xl shadow-xl`}>
          <h2>{favor}</h2>

          <button onClick={() => removeFavorite(convert(favor))}>Remove from Favorites</button>
        </div>
      })}



    </div>
  )
}

export default Favorites
