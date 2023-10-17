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

function App() {

  function reducer(isPlaying, action) {
    switch (action.type) {
      case ACTIONS.INTRO:
        return ACTIONS.INTRO
      case ACTIONS.PLAYING:
        return ACTIONS.PLAYING
      case ACTIONS.RESULTS:
        return ACTIONS.RESULTS
      default:
        return ACTIONS.INTRO;
    }
  }

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
