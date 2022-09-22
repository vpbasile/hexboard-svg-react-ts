// Top-level App for selecting a specific Gameboard to display
import { useState } from 'react';

//style
import './css/bootstrap.css';
import './css/trivia-color-dark.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';

// <> Import GameBoards
import TriviaBoard from './boards/TriviaBoard';
import Keyboard from './boards/Keyboard';
import Generative from './boards/Generative';
import SavedBoard from './boards/SavedBoard';
import CreateBoard from './boards/CreateBoard';

function App() {

  // <> Global constants for choosing a game
  const options = [
    { key: 'trivia', title: 'Trivia Board', value: 'trivia', GameBoard: <TriviaBoard /> },
    { key: 'generative', title: 'Generative Map', value: 'generative', GameBoard: <Generative /> },
    { key: 'saved', title: 'Saved Map', value: 'saved', GameBoard: <SavedBoard /> },
    { key: 'create', title: 'Create Board', value: 'create', GameBoard: <CreateBoard /> },
    { key: 'keyboard', title: 'Keyboard', value: 'keyboard', GameBoard: <Keyboard /> },
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
    <div className="App container-fluid bg-black text-light p-4">
      <div className="row" id="header">
        <div className="col-12">
          <h1>Hexboard Maker</h1>
          <nav id="nav-bar" className='col-12'>{navBar}</nav>
        </div>
      </div>
      <div className="row" id="page-content-row">
        <ErrorBoundary>
          <h2 className="bg-gray border">{chosenGameBoard.title}</h2>
          {chosenGameBoard.GameBoard}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App;