import React from 'react'
import imgBlue from "./assets/blue.png"
import imgYellow from "./assets/yellow.png"
import Game from "./components/Game"
import Intro from "./components/Intro"

export const ACTIONS = {
  INTRO: "INTRO",
  PLAYING: "PLAYING",
  RESULTS: "RESULTS"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INTRO:
    case ACTIONS.PLAYING:
    case ACTIONS.RESULTS:
      return action.type
    default:
      return state;
  }
}

function App() {

  const [isPlaying, dispatch] = React.useReducer(reducer, ACTIONS.INTRO)

  return (
    <div className='app'>
      <img className='imgBlue' src={imgBlue} />
      <img className='imgYellow' src={imgYellow} />
      {isPlaying === ACTIONS.INTRO ?
        <Intro dispatch={dispatch} /> :
        <Game dispatch={dispatch} isPlaying={isPlaying} />}
    </div>
  )
}

export default App
