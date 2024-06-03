import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import axios from 'axios'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useTriviaStore } from './stors';

const convert = (str) => {
  const txt = document.createElement("textarea")
  txt.innerHTML = str;
  return txt.value;
}

function formatQuestions2(questions) {
  // Iterate through each question
  const formattedQuestions = questions.map(question => {
    // Create a copy of incorrect answers array
    const incorrectAnswers = [...question.incorrect_answers];
    // Randomly select a position to insert the correct answer
    const correctAnswerPosition = Math.floor(Math.random() * 4);
    // Insert the correct answer at the random position
    incorrectAnswers.splice(correctAnswerPosition, 0, question.correct_answer);
    // Return the formatted question object with answers as an array
    return {
      question: question.question,
      answers: incorrectAnswers
    };
  });
  return formattedQuestions;
}


function formatQuestions(questions) {
  // Iterate through each question
  const formattedQuestions = questions.map(question => {
    // Create a copy of incorrect answers array
    const incorrectAnswers = [...question.incorrect_answers];
    // Randomly select a position to insert the correct answer
    const correctAnswerPosition = Math.floor(Math.random() * question.incorrect_answers.length);
    // Insert the correct answer at the random position
    incorrectAnswers.splice(correctAnswerPosition, 0, question.correct_answer);
    // Map answers to objects with additional field indicating if it's correct
    const answers = incorrectAnswers.map(answer => ({
      answer,
      isCorrect: answer === question.correct_answer
    }));
    // Return the formatted question object with answers as an array of objects
    return {
      question: question.question,
      answers
    };
  });
  return formattedQuestions;
}

// Example originalQuestions array
const originalQuestions = [
  // Your array of questions here
];












const App = () => {
  const [questions, setQuestions] = useState([])

  const [loading, setLoading] = useState([])
  const [counter, setCounter] = useState(0)
  const [favorites, setFavorites] = useState([])
  console.log(questions)
  // console.log(formatQuestions(questions));
  
   const user = useTriviaStore(state=>state.user)





  function updateFavorites(index, object) {
    console.log(index);
   setFavorites(prev=>{
    const newArray = [...prev];
    newArray.splice(index, 0, object);
    console.log(newArray);
    return newArray;
   })
  }
  
  
  
  const getQuestions = async () => {
    setLoading(true);
    try {
      //  await new Promise(resolve => setTimeout(resolve, 5000))
      const result = await axios.get('https://opentdb.com/api.php?amount=9')
        .then(({ data }) => setQuestions(formatQuestions(data.results)))
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    getQuestions()
  }, [])


  const handleClick = () => {
    setCounter(counter + 1)
  }


  return (
    <div>
      <Header />
      <main>
        <section>
          <h1>Questions</h1>
          <span>{counter}</span>
          <div className={`${loading ? "animate-pulse" : " "} grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 px-2`}>
      
            {questions.map((question, i) => (
              <article key={question.question} className='border border-green-300 p-4 rounded-xl shadow-xl'>
                <span className='flex justify-between'><h2 >{convert(question.question)}</h2>
                {favorites[i]?<FaStar color='gold' /> : <CiStar  onClick={()=>{updateFavorites(i, question)}}/>}</span>
                <span className='flex flex-col gap-4 border border-blue-500'>
                  {question.answers.map((answer) => {
                    return <button
                      onClick={() => { if (answer.isCorrect) handleClick() }}
                      className={`border border-red-500 ${answer.isCorrect ? 'text-green-600' : "text-red-400"}`} key={answer.answer}>
                        {convert(answer.answer)}</button>
                  })}

                </span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
