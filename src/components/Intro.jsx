import React from 'react'
import { ACTIONS } from '../App'

export default function Intro({ dispatch }) {

  function handleStartQuiz() {
    dispatch({ type: ACTIONS.PLAYING });
  };

  return (
    <div className='intro'>
      <h1>Quizzical</h1>
      <p>Welcome to my game!</p>
      <button onClick={handleStartQuiz} style={{ marginTop: "15px" }}>Start quiz</button>
    </div>
  )
}
