import GameBoard from './GameBoard';
// import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';
import { cube_ring } from '../hexFunctions';

export default function TriviaBoard(props) {

	// Trivia-specific constants
	const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-yellow", "bg-purple", "bg-orange"]
	let cssClassIndex = 0;
	function getNextCssClass() {
		let cssClass = cssClasses[cssClassIndex];
		cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
		return cssClass;
	}

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

	// <> Gameboard building
	function blackHexes(hexes) {
		hexes.forEach(hex => {
			hex.cssClasses = "gameboard-space bg-black"
		})
	}

	function colorHexes(hexes) {
		hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${gameGlobals.getNextCssClass()}` })
	}

	// Create a center hexagon
	const centerHexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }
	let hexData = [centerHexagon]

	var hexRoster = hexData.map(hex => {
		// Give all the hexes a cssClasses if they don't already have one
		if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
		return hex;
	})

	// console.log(`hexRoster: ${JSON.stringify(hexRoster)}`)

	return (
		<div className="App">
			<header className="App-header">
				<h1>Trivia Board</h1>
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						canvasGlobals={canvasGlobals}
						gameGlobals={gameGlobals}
					/>
				</ErrorBoundary>
			</header>
		</div>
	);
}