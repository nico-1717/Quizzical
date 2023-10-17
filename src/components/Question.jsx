import React from 'react'
import he from 'he'
import { ACTIONS } from '../App'

export default function Question(props) {
    
    const styleChecked = {
        backgroundColor: "#D6DBF5",
        color: "#293264"
    }
    const styleCorrect = {
        backgroundColor: "#94D7A2",
    }
    const styleWasCorrect = {
        backgroundColor: "#38934B",
        color: "#B2E9DF"
    }
    const styleIncorrect = {
        opacity: "0.5",
        backgroundColor: "#F8BCBC",
    }
    const styleNeutral = {
        opacity: "0.5",
    }

    function getStyle(isChecked, correct, text) {
        if (isChecked) {
            return correct === text ? styleCorrect : styleIncorrect;
        } else {
            return text === correct ? styleWasCorrect : styleNeutral;
        }
    }

    const answerElements = props.answers.map((answer, index) => {
        return (
            props.isPlaying === ACTIONS.PLAYING ?
                <button
                    type="button"
                    key={index}
                    className={'answers--answer'}
                    style={answer.checked ? styleChecked : {}}
                    onClick={() => props.handleClick(props.idQuestion, answer.idAnswer)}
                >
                    {he.decode(answer.answer)}
                </button> :
                <button
                    type="button"
                    key={index}
                    className={'answers--answer'}
                    style={getStyle(answer.checked, props.correct, answer.answer)}
                >
                    {he.decode(answer.answer)}
                </button>
        )
    })

    return (
        <div style={{ width: "100%" }}>
            <div className='question'>
                <h1 className='game--h1'>{he.decode(props.question)}</h1>
                <div className='question--answers'>
                    {answerElements}
                </div>
            </div>
            <hr></hr>
        </div>
    )
}
