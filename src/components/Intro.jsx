import React from 'react'
import { ACTIONS } from '../App'

export default function Intro(props) {
  return (
    <div className='intro'>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={() => props.dispatch({type: ACTIONS.PLAYING})} style={{marginTop: "15px"}}>Start quiz</button>
    </div>
  )
}
