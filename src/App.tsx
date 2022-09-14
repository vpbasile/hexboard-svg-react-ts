// Top-level App for selecting a specific Gameboard to display
import React from 'react';
import { useState } from 'react';

//style
import './css/bootstrap.css';
import './css/trivia-color-dark.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';
import { PageContentRow, PageHeaderRow } from './components/PageStructure';
import CanvasControl from './components/CanvasControl';

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
  const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["flat-top"])

  // <> Global constants for choosing a game
  const options = [
    {
      key: 'saved', title: 'Saved Map', value: 'saved', GameBoard: <SavedBoard
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      >

        {/* Pass the canvasControl as a child */}
        <CanvasControl
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          SETcanvasWidth={SETcanvasWidth}
          SETcanvasHeight={SETcanvasHeight}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier}
        />
      </SavedBoard>
    },
    {
      key: 'generative', title: 'Generative Map', value: 'generative', GameBoard: <Generative
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      >
        {/* Pass the canvasControl as a child */}
        <CanvasControl
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          SETcanvasWidth={SETcanvasWidth}
          SETcanvasHeight={SETcanvasHeight}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier}
        />
      </Generative>
    },
    {
      key: 'create', title: 'Create Board', value: 'create', GameBoard: <CreateBoard
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': canvasWidth / 2, 'y': canvasHeight / 2 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      >

        {/* Pass the canvasControl as a child */}
        <CanvasControl
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          SETcanvasWidth={SETcanvasWidth}
          SETcanvasHeight={SETcanvasHeight}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier}
        />
      </CreateBoard>
    },
    {
      key: 'trivia', title: 'Trivia Board', value: 'trivia', GameBoard: <TriviaBoard
        canvasWidth={500}
        canvasHeight={500}
        orientation={hexOrientations["flat-top"]}
        gridOrigin={{ 'x': 250, 'y': 250 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      >

        {/* Pass the canvasControl as a child */}
        <CanvasControl
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          SETcanvasWidth={SETcanvasWidth}
          SETcanvasHeight={SETcanvasHeight}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier}
        />
      </TriviaBoard>
    },
    {
      key: 'keyboard', title: 'Keyboard', value: 'keyboard', GameBoard: <Keyboard
        canvasWidth={600}
        canvasHeight={200}
        orientation={hexOrientations["pointy-top"]}
        gridOrigin={{ 'x': 100, 'y': 100 }}
        hexRadius={hexRadius}
        separationMultiplier={separationMultiplier}
        textSize={hexRadius / 1.25}
        canvasBackgroundColor={'#000'}
      >
        {/* Pass the canvasControl as a child */}
        <CanvasControl
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          SETcanvasWidth={SETcanvasWidth}
          SETcanvasHeight={SETcanvasHeight}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier}
        />
      </Keyboard>
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
    <div className="App container w-100 bg-black text-light p-4">
      <div className="row" id="header">
        <div className="col-12">
          <h1>Hexboard Maker</h1>
          <nav id="nav-bar" className='col-12'>{navBar}</nav>
        </div>
      </div>
      <div className="row" id="page-content-row">
        <ErrorBoundary>
          <h2 className="bg-gray border">{chosenGameBoard.title}</h2>
        </ErrorBoundary>

        {chosenGameBoard.GameBoard}
      </div>
    </div>
  )
}

export default App;