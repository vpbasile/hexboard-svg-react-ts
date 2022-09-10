// Top-level App for selecting a specific Gameboard to display
import React from 'react';
import { useState } from 'react';

//style
import './css/bootstrap.css';
import './css/trivia-color-dark.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';
import { canvasGlobals } from './components/hexDefinitions';
import { PageContentRow, PageHeaderRow } from './components/PageStructure';

// <> Import GameBoards
import TriviaBoard from './boards/TriviaBoard';
import Keyboard from './boards/Keyboard';
// import BoardMaker from './boards/BoardMaker';
import Generative from './boards/Generative';
import SavedBoard from './boards/SavedBoard';
import CreateBoard from './boards/CreateBoard';

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
    { key: 'saved', title: 'Saved Map', value: 'saved', GameBoard: <SavedBoard canvasGlobals={canvasGlobals} /> },
    { key: 'generative', title: 'Generative Map', value: 'generative', GameBoard: <Generative canvasGlobals={canvasGlobals} /> },
    { key: 'create', title: 'Create Board', value: 'create', GameBoard: <CreateBoard canvasGlobals={canvasGlobals} /> },
    { key: 'trivia', title: 'Trivia Board', value: 'trivia', GameBoard: <TriviaBoard canvasGlobals={canvasGlobals} /> },
    { key: 'keyboard', title: 'Keyboard', value: 'keyboard', GameBoard: <Keyboard canvasGlobals={canvasGlobals} /> },
  ]
  const [chosenGameBoard, setGame] = useState(options[0])

  function pickGameBoard(pickedKey: string) {
    const choice = options.find((thisOption) => { return (thisOption.key === pickedKey) })
    if (choice) setGame(choice)
  }

  const navBar = options.map(option => {
    let css = `bg-gray`
    return (
      <button key={buttonID++} onClick={() => pickGameBoard(option.key)}
        className={`btn m-2 ${css}`}> {option.title}</button >
    )
  })

  return (
    <ErrorBoundary>
      <div className="App container bg-black text-light">
        <PageHeaderRow pageTitle='Hexboard Maker'>
          <nav id="nav-bar" className='col-12'>{navBar}</nav>
        </PageHeaderRow>
        <PageContentRow title={chosenGameBoard.title}>
          <ErrorBoundary>
            {chosenGameBoard.GameBoard}
          </ErrorBoundary>
        </PageContentRow>
      </div>
    </ErrorBoundary>
  )
}

export default App;