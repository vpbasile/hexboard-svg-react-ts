// Top-level App for selecting a specific Gameboard to display
import React from 'react';
import { useState } from 'react';

//style
import './css/bootstrap.css';
import './css/trivia-color-dark.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';
import TriviaBoard from './boards/TriviaBoard';
import Keyboard from './boards/Keyboard';
// import BoardMaker from './boards/BoardMaker';
import Generative from './boards/Generative';
import SavedBoard from './boards/SavedBoard';
import { canvasGlobals } from './components/hexDefinitions';
import CreateBoard from './boards/CreateBoard';
// import consistentButton from './boards/NeatButtons';
// import { Button } from 'bootstrap-react';

// Import UI elements

function App() {

  // <> Global Constants for Utility
  const canvasWidth = window.innerWidth
  const canvasHeight = 2 * window.innerHeight
  const canvasGlobals: canvasGlobals = {
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    canvasCenter: { 'x': canvasWidth / 2, 'y': canvasHeight / 2 }

  }

  let buttonID = 0;

  // <> Global constants for choosing a game
  const options = [
    { key: 'generative', text: 'Generative', value: 'generative' },
    { key: 'create', text: 'Create', value: 'create' },
    { key: 'saved', text: 'Saved Map', value: 'saved' },
    { key: 'trivia', text: 'Trivia', value: 'trivia' },
    // { key: 'maker', text: 'Gameboard Maker', value: 'maker' },
    { key: 'keyboard', text: 'Keyboard', value: 'keyboard' },
  ]
  const [game, setGame] = useState('')
  const navBar = options.map(option => {
    let css = `bg-orange`
    return (
      <button key={buttonID++} onClick={() => setGame(option.key)}
        className={`btn m-2 ${css}`}> {option.text}</button >
    )
  })

  let chosenGameBoard

  // const chosenGameBoard = game === 'trivia' ? <TriviaBoard /> : <KeyboardBoard />
  switch (game) {
    // case 'maker': chosenGameBoard = <BoardMaker
    //   canvasGlobals={canvasGlobals}
    // />; break;
    case 'trivia': chosenGameBoard = <TriviaBoard
      canvasGlobals={canvasGlobals}
    />; break;
    case 'saved': chosenGameBoard = <SavedBoard
      canvasGlobals={canvasGlobals}
    />; break;
    case 'create': chosenGameBoard = <CreateBoard
      canvasGlobals={canvasGlobals}
    />; break;
    case 'keyboard': chosenGameBoard = <Keyboard
      canvasGlobals={canvasGlobals}
    />; break;
    default: chosenGameBoard = <Generative
      canvasGlobals={canvasGlobals}
    />
  }

  return (
    <ErrorBoundary>
      <div className="App container bg-black">
        <h1>Hexboard Maker</h1>
        <nav className='row'>
          <div id="nav-bar" className='col-12'>
            {navBar}
          </div>
        </nav>
        <ErrorBoundary>
          {chosenGameBoard}
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  )
}

export default App;