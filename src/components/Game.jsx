import React, { useState, useEffect } from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'
import { ACTIONS } from '../App'


export default function Game({ dispatch, isPlaying }) {

    const [countCorrect, setCountCorrect] = useState(0)
    const [questionsAPI, setQuestionsAPI] = useState([])
    /*
    idQuestion:
    question:
    correctAnswer:
    answers:{
        idAnswer:
        answer:
    }
    */


    useEffect(function () {

        async function getQuestionsAPI() {
            try {
                const res = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple`)
                const data = await res.json()

                if (data.response_code == 0) {
                    setQuestionsAPI(data.results.map(result => {
                        return {
                            idQuestion: nanoid(),
                            question: result.question,
                            correctAnswer: result.correct_answer,
                            answers: createAnswersObject(result.correct_answer, result.incorrect_answers)
                        }
                    }))
                }
                else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }

        getQuestionsAPI()

    }, [])

    function createAnswersObject(correctAnswer, incorrectAnswers) {
        const array = [correctAnswer, ...incorrectAnswers]

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array.map(item => {
            return {
                idAnswer: nanoid(),
                answer: item,
                checked: false
            }
        })
    }

    function handleClick(idQuestion, idAnswer) {

        setQuestionsAPI(prevQuestionsAPI => {
            const newQuestion = prevQuestionsAPI.map(questionAPI => {

                if (questionAPI.idQuestion === idQuestion) {

                    const newAnswer = questionAPI.answers.map(answer => {
                        if (answer.idAnswer == idAnswer) {
                            return ({
                                ...answer,
                                checked: !answer.checked
                            })
                        }
                        else {
                            return ({
                                ...answer,
                                checked: false
                            })
                        }
                    })
                    return { ...questionAPI, answers: newAnswer }

                }
                else {
                    return questionAPI
                }
            })
            return newQuestion
        })

    }

    function handleSubmit(event) {
        event.preventDefault()

        const userAnswers = questionsAPI.flatMap(question => {
            return question.answers.filter(answer => answer.checked)
        })

        dispatch({ type: ACTIONS.RESULTS })

        setCountCorrect(function () {
            let counter = 0
            userAnswers.map((userAnswer, index) => {
                if (userAnswer.answer === questionsAPI[index].correctAnswer) {
                    counter++
                }
            })
            return counter
        })

    }

    const questionElements = questionsAPI.map((questionAPI, index) => {
        return (
            <Question
                key={questionAPI.idQuestion}
                idQuestion={questionAPI.idQuestion}
                question={questionAPI.question}
                answers={questionAPI.answers}
                handleClick={handleClick}
                isPlaying={isPlaying}
                correct={isPlaying === ACTIONS.PLAYING ? "" : questionsAPI[index].correctAnswer}
            />
        )
    })

    return (
        <div className='game'>
            {questionsAPI.length > 0 ?
                <form onSubmit={handleSubmit} className='game--elements'>
                    {questionElements}
                    {isPlaying === ACTIONS.PLAYING ?
                        <button>Check answer</button> :
                        <div className='playAgain'>
                            <h1 className='game--h1'>You scored {countCorrect}/{questionsAPI.length} correct answers</h1>
                            <button type='button' onClick={() => dispatch({ type: ACTIONS.INTRO })}>Play again</button>
                        </div>}
                </form> :
                <h1 style={{textAlign: "center"}}>Loading...</h1>}
        </div>
    )
}
