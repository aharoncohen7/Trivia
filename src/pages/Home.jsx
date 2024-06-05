import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useTriviaStore } from '../stores';
import { NavLink, useNavigate } from 'react-router-dom';
;

const Home = () => {
    const fetchQuestions = useTriviaStore(state => state.fetchQuestions);
    const questions = useTriviaStore(state => state.questions);
    const loading = useTriviaStore(state => state.loading);
    const addFavorite = useTriviaStore(state => state.addFavorite);
    const removeFavorite = useTriviaStore(state => state.removeFavorite);
    const isFavorite = useTriviaStore(state => state.isFavorite);
    const favorites = useTriviaStore(state => state.favorites);
    const darkMode = useTriviaStore(state => state.darkMode);
    const primaryColor = useTriviaStore(state => state.primaryColor);
    console.log(favorites.length)
    console.log(questions);


    // טעינה ראשונה
    useEffect(() => {
        fetchQuestions()
    }, [])

    // מחיקת תוים מיותרים
    const convert = (str) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = str;
        return txt.value;
    }


    // עדכון מועדפים
    function updateFavorites(question) {
        if (isFavorite(question)) {
            removeFavorite(question)
        }
        else {
            addFavorite(question)
        }
        // console.log(favorites)
    }





    return (
        <div>
            <main>

                <section>
                    <span className='flex '>

                    </span>
                    <div className={`${loading ? "animate-pulse" : " "} grid gap-4 grid-cols-1 md:grid-cols-3 py-8 px-48`}>
                    <button style={{ backgroundColor: primaryColor }} className='p-4 rounded-md' onClick={fetchQuestions}>🔃 Refresh</button>
                        <NavLink to={"favorites"}><button style={{ backgroundColor: primaryColor }} className='w-full p-4 rounded-md' >Go to my favorites ➡️ </button></NavLink>
                        <NavLink to={"play"}><button style={{ backgroundColor: primaryColor }} className='w-full p-4 rounded-md'>Play ▶️</button></NavLink>
                        {questions?.map((question, i) => (
                            <article key={question.question} className={`flex flex-col justify-between border border-${darkMode ? "white" : "black"} p-4 rounded-xl shadow-xl `}>

                                <span className='flex justify-between font-bold gap-2'>
                                    <h2 className='pb-4'>{convert(question.question)}</h2>
                                    <span className='w-4'>
                                        {isFavorite(convert(question.question))
                                            ? <FaStar color='gold'
                                                onClick={() => { updateFavorites(convert(question.question)) }}
                                            /> : <CiStar
                                                onClick={() => { updateFavorites(convert(question.question)) }}
                                            />}
                                    </span>
                                </span>
                                <span className='flex flex-col gap-1 items-start'>
                                    {question.answers.map((answer, i) => {
                                        return <span
                                            className={` ${answer.isCorrect ? 'text-green-600' : "text-red-400"}`} key={answer.answer}>
                                            {`${i + 1}. ${convert(answer.answer)}`}</span>
                                    })}

                                </span>
                            </article>
                        ))}
                    </div>
                </section>
                {favorites && favorites.map(favor => {
        console.log(favor)

        return <div key={favor} className={`border border-${darkMode ? "white" : "black"} p-4 rounded-xl shadow-xl`}>
          <h2>{favor}</h2>

          <button onClick={() => removeFavorite(convert(favor))}>Remove from Favorites</button>
        </div>
      })}

            </main>
         
        </div>
    )
}

export default Home



