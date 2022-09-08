import GameBoard from '../components/HexBoardSVG';
// import logo from './logo.svg';
import ErrorBoundary from '../components/ErrorBoundary';
import { cube_ring } from '../components/hexFunctions';
import { canvasGlobals, hexagon } from '../components/hexDefinitions';
// <> Enhancement: Store all of the q,r directiom vector pairs in an array
// <> Pull in some functions from the GameBoard component

export default function TriviaBoard(props: { canvasGlobals: canvasGlobals; }) {
  const canvasGlobals = props.canvasGlobals;
  const canvasHeight = canvasGlobals.canvasHeight;
  const canvasWidth = canvasGlobals.canvasWidth;
  const canvasCenter = canvasGlobals.canvasCenter;

  // Trivia-specific constants
  const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-yellow", "bg-purple", "bg-orange"]
  let cssClassIndex = 0;
  function getNextCssClass() {
    let cssClass = cssClasses[cssClassIndex];
    cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
    return cssClass;
  }

  let triviaHexes = [];

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
  function blackHexes(hexes:hexagon[]) {
    hexes.forEach(hex => {
      hex.cssClasses = "gameboard-space bg-black"
    })
  }

  function colorHexes(hexes:hexagon[]) {
    hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${gameGlobals.getNextCssClass()}` })
  }

  // Create a center hexagon
  const centerHexagon = { "key":0, "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }
  let hexData:hexagon[] = [centerHexagon]

  // First ring
  let ring1:hexagon[] = cube_ring({ "q": 0, "r": 0 }, 1);
  blackHexes(ring1);

  //Second ring
  let ring2:hexagon[] = cube_ring({ "q": 0, "r": 0 }, 2)
  colorHexes(ring2);

  // Third ring
  let ring3:hexagon[] = cube_ring({ "q": 0, "r": 0 }, 3)
  blackHexes(ring3);

  // Fourth ring
  let ring4:hexagon[] = cube_ring({ "q": 0, "r": 0 }, 4)
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Board</h1>
			<h2>Orientation: flat-top</h2>
        <ErrorBoundary>
          <GameBoard
            hexRoster={triviaHexes}
            canvasGlobals={canvasGlobals}
            gameGlobals={gameGlobals}
            rotation={"90deg"}
            whichOrientation={"flat-top"}

          //   logo={logo}
          />
        </ErrorBoundary>
      </header>
    </div>
  );
}