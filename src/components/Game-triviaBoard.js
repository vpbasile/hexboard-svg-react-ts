import GameBoard from './GameBoard';
// import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';
import { cube_ring } from './hexFunctions';
// <> Enhancement: Store all of the q,r directiom vector pairs in an array
// <> Pull in some functions from the GameBoard component

export default function TriviaBoard(props) {

  // Trivia-specific constants
  const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-yellow", "bg-purple", "bg-orange"]
  let cssClassIndex = 0;
  function getNextCssClass() {
    let cssClass = cssClasses[cssClassIndex];
    cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
    return cssClass;
  }

  var triviaHexes = [];
  const canvasGlobals = props.canvasGlobals;
  const canvasHeight = canvasGlobals.canvasHeight;
  const canvasWidth = canvasGlobals.canvasWidth;
  const canvasCenter = canvasGlobals.canvasCenter;
  
  // <> Gameboard Parameters
  const gameGlobals = {
    // Utility
    canvasBackgroundColor: '#000',
    canvasCenter: canvasCenter,
    verbose: false,
    canvasHeight: canvasHeight,
    canvasWidth: canvasWidth,
    // Hexagons
    gridOrigin: canvasCenter,
    hexRadius: 30,
    separationMultiplier: 1.1,
    textSize: 50,
    orientationName: "flat-top",
    // Style
    getNextCssClass: getNextCssClass,
  }

    // <> Utility
    // <> Helper and Math Functions


  // <> Gameboard building
  function blackHexes(hexes){
    hexes.forEach(hex => {
      hex.cssClasses = "gameboard-space bg-black"
		})
	}
  
	function colorHexes(hexes){
    hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${gameGlobals.getNextCssClass()}` })
	}
  
	// Create a center hexagon
	const centerHexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }
	let hexData = [centerHexagon]
  
	// First ring
	let ring1 = cube_ring({ "q": 0, "r": 0 }, 1);
	blackHexes(ring1);
  
	//Second ring
	let ring2 = cube_ring({ "q": 0, "r": 0 }, 2)
	colorHexes(ring2);
  
	// Third ring
	let ring3 = cube_ring({ "q": 0, "r": 0 }, 3)
	blackHexes(ring3);
  
	// Fourth ring
	let ring4 = cube_ring({ "q": 0, "r": 0 }, 4)
	colorHexes(ring4);
  
	// Gather the different rings together
	hexData = hexData.concat(ring1);
	hexData = hexData.concat(ring2);
	hexData = hexData.concat(ring3);
	hexData = hexData.concat(ring4);
  
  triviaHexes = hexData.map(hex => {
    // Give all the hexes a cssClasses if they don't already have one
    if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
    return hex;
  })

  // console.log(`triviaHexes: ${JSON.stringify(triviaHexes)}`)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Board</h1>
        <ErrorBoundary>
          <GameBoard
          hexRoster={triviaHexes}
            canvasGlobals={canvasGlobals}
            gameGlobals={gameGlobals}
          //   logo={logo}
          />
        </ErrorBoundary>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}