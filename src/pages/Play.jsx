import React, { useEffect, useState } from 'react'
import { useTriviaStore } from '../stores';

const Play = () => {
    const fetchQuestions = useTriviaStore(state => state.fetchQuestions);
    const questions = useTriviaStore(state => state.questions);
    const primaryColor = useTriviaStore(state => state.primaryColor);
    const setLoading = useTriviaStore(state => state.setLoading);
    const loading = useTriviaStore(state => state.loading);
    const endGame = useTriviaStore(state => state.endGame);
    const answers = useTriviaStore(state => state.answers);
    const correct_answers = useTriviaStore(state => state.correct_answers);
    // console.log("🚀 ~ Play ~ questions:", questions[0]?.question)
    const [correctCounter, setCorrectCounter] = useState(0)
    const [wrongCounter, setWrongCounter] = useState(0)




    // טעינה ראשונה
    useEffect(() => {
        fetchQuestions()
    }, [])
    // טעינה ראשונה
    useEffect(() => {
        console.log(correctCounter + " : " + wrongCounter);
    }, [correctCounter, wrongCounter])

    const handleCorrect = () => {
        if (correctCounter + wrongCounter == 8) {
            handleEndGame()
        }
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setCorrectCounter(prev => prev + 1)
        }, 400)
    }

    const handleWrong = () => {
        if (correctCounter + wrongCounter == 8) {
            handleEndGame()
        }
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setWrongCounter(prev => prev + 1)
        }, 400)
    }

    const handleEndGame = () => {
        let correct_answers = localStorage.getItem('score')?.split('/')[0] || 0;
        let answers = localStorage.getItem('score')?.split('/')[1] || 0;
        localStorage.setItem('score', `${Number(correct_answers) + correctCounter}/${Number(answers) + 9}`)
        endGame(correctCounter)
    }
    const newGame = () => {
        setCorrectCounter(0)
        setWrongCounter(0)
        fetchQuestions()
    }


    // מחיקת תוים מיותרים
    const convert = (str) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = str;
        return txt.value;
    }







    return (
        <>
            {correctCounter + wrongCounter < 9 ?
                <div className='flex justify-center items-center flex-col p-22 '>
                    <h2 className='font-semibold text-xl p-20'>{convert(questions[correctCounter + wrongCounter]?.question)}</h2>
                    <span className='flex grid gap-4 grid-cols-2 gap-1 items-start '>
                        {questions[correctCounter + wrongCounter]?.answers.map((answer, i) => {
                            return <button
                                style={{ backgroundColor: loading && answer.isCorrect ? "green" : primaryColor }}
                                className='p-4 rounded-xl shadow-xl text-semibold text-white'

                                onClick={answer.isCorrect ? handleCorrect : handleWrong}
                                key={answer.answer}>
                                {convert(answer.answer)}
                            </button>
                        })}
                    </span>
                </div>
                :
                <div className='flex justify-center items-center flex-col p-22'>
                    <h2 className='font-semibold text-xl p-20'>{`final score: ${correctCounter} from 9`}</h2>
                    <span className='font-semibold text-xl p-20'>{`Success ratio so far: ${correct_answers}/${answers}`}</span>


                    <button
                        style={{ backgroundColor: primaryColor }}
                        className='p-4 rounded-xl shadow-xl text-semibold text-white'
                        onClick={newGame}
                    >Play Again</button>
                </div>


            }
        </>
    )
}

export default Play
