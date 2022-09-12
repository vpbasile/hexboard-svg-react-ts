// Top-level App for selecting a specific Gameboard to display
import React from 'react';
import { useState } from 'react';

//style
import './css/bootstrap.css';
import './css/trivia-color-dark.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';
import { PageContentRow, PageHeaderRow } from './components/PageStructure';

// <> Import GameBoards
import TriviaBoard from './boards/TriviaBoard';
import Keyboard from './boards/Keyboard';
// import BoardMaker from './boards/BoardMaker';
import Generative from './boards/Generative';
import SavedBoard from './boards/SavedBoard';
import CreateBoard from './boards/CreateBoard';
import { hexOrientations } from './components/hexFunctions';

function App() {
  // <> States the contraol canvas parameters
  const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
  const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
  const [hexRadius, SEThexRadius] = useState(20);
  const [separationMultiplier, SETseparationMultiplier] = useState(1.1)

  const canvasSettingsRow =
    <div className="row border bg-gray p-3" id="canvasSettings">
      <div className="col-4" id="canvasDimensionDiv">
        <label htmlFor='pickCanvasWidth'>Canvas Width:</label>
        <input type='number' className='form-control' defaultValue={canvasWidth} onChange={(e) => SETcanvasWidth(+e.target.value)} />
        <label htmlFor='pickCanvasHeight'>Canvas Height:</label>
        <input type='number' className='form-control' defaultValue={canvasHeight} onChange={(e) => SETcanvasHeight(+e.target.value)} />
      </div>
      <div className="col-4" id="pickSizeDiv">
        <label htmlFor="pickSize">Hex radius in px: </label>
        <input type="number" className='form-control' defaultValue={hexRadius} onChange={(e) => SEThexRadius(+e.target.value)} />
      </div>
      <div className="col-4" id="pickSeparationDiv">
        <label htmlFor='pickSeparation'>Separation multiplier: {separationMultiplier}</label>
        <input type='range' min='1' max='2' step='0.1' className='form-range' defaultValue={separationMultiplier} onChange={(e) => SETseparationMultiplier(+e.target.value)} />
      </div>
    </div>

  // <> Global constants for choosing a game
  const options = [
    {
      key: 'saved', title: 'Saved Map', value: 'saved', GameBoard: <SavedBoard
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        canvasCenter={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      />
    },
    {
      key: 'generative', title: 'Generative Map', value: 'generative', GameBoard: <Generative
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        canvasCenter={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      />
    },
    {
      key: 'create', title: 'Create Board', value: 'create', GameBoard: <CreateBoard
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        canvasCenter={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      />
    },
    {
      key: 'trivia', title: 'Trivia Board', value: 'trivia', GameBoard: <TriviaBoard
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        canvasCenter={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      />
    },
    {
      key: 'keyboard', title: 'Keyboard', value: 'keyboard', GameBoard: <Keyboard
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        canvasCenter={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        orientation={hexOrientations["pointy-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      />
    },
  ]
  const [chosenGameBoard, setGame] = useState(options[0])

  function pickGameBoard(pickedKey: string) {
    const choice = options.find((thisOption) => { return (thisOption.key === pickedKey) })
    if (choice) setGame(choice)
  }

  let buttonID = 0;
  const navBar = options.map(option => {
    let css = `bg-gray`
    return (
      <button key={buttonID++} onClick={() => pickGameBoard(option.key)}
        className={`btn m-2 ${css}`}> {option.title}</button >
    )
  })

  return (
    <ErrorBoundary>
      <div className="App container bg-black text-light p-4">
        <PageHeaderRow pageTitle='Hexboard Maker'>
          <nav id="nav-bar" className='col-12'>{navBar}</nav>
        </PageHeaderRow>
        <ErrorBoundary>{canvasSettingsRow}</ErrorBoundary>
        <PageContentRow title={chosenGameBoard.title}>
          <ErrorBoundary>{chosenGameBoard.GameBoard}</ErrorBoundary>
        </PageContentRow>
      </div>
    </ErrorBoundary>
  )
}

export default App;