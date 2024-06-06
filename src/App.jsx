import React, { useEffect } from 'react'
import Layout from './layouts/Layout'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTriviaStore } from './stores';


const App = () => {
  const darkMode = useTriviaStore(state => state.darkMode);
   const user = useTriviaStore(state=>state.user);
   const setUser = useTriviaStore(state=>state.setUser);
   const setAnswers = useTriviaStore(state=>state.setAnswers);
   const setCorrect_Answers = useTriviaStore(state=>state.setCorrect_Answers);
   const navTo = useNavigate()


    // טעינה ראשונה
    useEffect(() => {
      let name = localStorage.getItem('name') || prompt("Enter your name:");
      setUser({name})
      localStorage.setItem('name', name)
      let correct_answers = localStorage.getItem('score')?.split('/')[0] || 0;
      setCorrect_Answers(correct_answers)
      let answers = localStorage.getItem('score')?.split('/')[1] || 0;
      setAnswers(answers);
      localStorage.setItem('score', `${correct_answers}/${answers}`)
      navTo('/home')

  }, [])



  return (
    <div className={`${darkMode?'bg-black text-white' : 'bg-white-700 text-black'}`}>





      <Layout>
      <Outlet />
    </Layout>
    </div>
  )
}

export default App



// import React, { useEffect, useState } from 'react'
// import Header from './components/Header'
// import axios from 'axios'
// import { CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa";
// import { useTriviaStore } from './stors';

// const App = () => {
//   // const user = useTriviaStore(state=>state.user);
//   const fetchQuestions = useTriviaStore(state=>state.fetchQuestions);
//   const questions = useTriviaStore(state=>state.questions);
//   const loading = useTriviaStore(state=>state.loading);
//   const isFavorite = useTriviaStore(state=>state.isFavorite);
  
//   const favorites = useTriviaStore(state=>state.favorites);
//   const addFavorite = useTriviaStore(state=>state.addFavorite);
//   const removeFavorite = useTriviaStore(state=>state.removeFavorite);
//   console.log(questions)


//   // const [questions, setQuestions] = useState([])
//   // const [loading, setLoading] = useState([])
//   // const [counter, setCounter] = useState(0)
//   // const [favorites, setFavorites] = useState([])
//   // console.log(formatQuestions(questions));
  

//   // function updateFavorites(index, object) {
//   //   console.log(index);
//   //  setFavorites(prev=>{
//   //   const newArray = [...prev];
//   //   newArray.splice(index, 0, object);
//   //   console.log(newArray);
//   //   return newArray;
//   //  })
//   // }
  
//     function updateFavorites(object) {
//       if(isFavorite(object)){
//         removeFavorite(object)
//       }
//       else{
//         addFavorite(object)
//       }
//       console.log(favorites);
//     }
  
  
  
//   // const getQuestions = async () => {
//   //   setLoading(true);
//   //   try {
//   //     //  await new Promise(resolve => setTimeout(resolve, 5000))
//   //     const result = await axios.get('https://opentdb.com/api.php?amount=9')
//   //       .then(({ data }) => setQuestions(formatQuestions(data.results)))
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   //   setLoading(false)
//   // }

//   useEffect(() => {
//     // getQuestions()
//     fetchQuestions()
//   }, [])


//   // const handleClick = () => {
//   //   setCounter(counter + 1)
//   // }


//   return (
//     <div>
//       <Header />
//       <main>
//         <section>
//           {/* <span>{counter}</span> */}
//           <div className={`${loading ? "animate-pulse" : " "} grid gap-4 grid-cols-1 md:grid-cols-3 py-8 px-48`}>
      
//             {questions?.map((question, i) => (
//               <article key={question.question} className='border border-green-300 p-4 rounded-xl shadow-xl'>
//                 <span className='flex justify-between font-bold'><h2 >{convert(question.question)}</h2>
//                 {
//                 isFavorite(convert(question.question))
//                 ?<FaStar color='gold'
//                 onClick={()=>{updateFavorites(convert(question.question))}}
//                 /> : <CiStar  
//                 // onClick={()=>{updateFavorites(i, question)}}
//                 onClick={()=>{updateFavorites(convert(question.question))}}
//                 />}</span>
//                 <span className='flex flex-col gap-4  items-start'>
//                   {question.answers.map((answer) => {
//                     return <button
//                       // onClick={() => { if (answer.isCorrect) handleClick() }}
//                       className={` ${answer.isCorrect ? 'text-green-600' : "text-red-400"}`} key={answer.answer}>
//                         {convert(answer.answer)}</button>
//                   })}

//                 </span>
//               </article>
//             ))}
//           </div>
//         </section>
//         <button className='p-4 bg-green-800 rounded-md' onClick={fetchQuestions}>new questions</button>
//       </main>
//     </div>
//   )
// }

// export default App



// const convert = (str) => {
//   const txt = document.createElement("textarea")
//   txt.innerHTML = str;
//   return txt.value;
// }

// function formatQuestions2(questions) {
//   // Iterate through each question
//   const formattedQuestions = questions.map(question => {
//     // Create a copy of incorrect answers array
//     const incorrectAnswers = [...question.incorrect_answers];
//     // Randomly select a position to insert the correct answer
//     const correctAnswerPosition = Math.floor(Math.random() * 4);
//     // Insert the correct answer at the random position
//     incorrectAnswers.splice(correctAnswerPosition, 0, question.correct_answer);
//     // Return the formatted question object with answers as an array
//     return {
//       question: question.question,
//       answers: incorrectAnswers
//     };
//   });
//   return formattedQuestions;
// }


// function formatQuestions(questions) {
//   // Iterate through each question
//   const formattedQuestions = questions.map(question => {
//     // Create a copy of incorrect answers array
//     const incorrectAnswers = [...question.incorrect_answers];
//     // Randomly select a position to insert the correct answer
//     const correctAnswerPosition = Math.floor(Math.random() * question.incorrect_answers.length);
//     // Insert the correct answer at the random position
//     incorrectAnswers.splice(correctAnswerPosition, 0, question.correct_answer);
//     // Map answers to objects with additional field indicating if it's correct
//     const answers = incorrectAnswers.map(answer => ({
//       answer,
//       isCorrect: answer === question.correct_answer
//     }));
//     // Return the formatted question object with answers as an array of objects
//     return {
//       question: question.question,
//       answers
//     };
//   });
//   return formattedQuestions;
// }