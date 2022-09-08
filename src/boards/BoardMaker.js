import GameBoard from '../components/HexBoardSVG';
// import logo from './logo.svg';
import ErrorBoundary from '../components/ErrorBoundary';
import { useState } from 'react';

export default function BoardMaker(props) {

	const canvasGlobals = props.canvasGlobals;
	const canvasHeight = canvasGlobals.canvasHeight;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasCenter = canvasGlobals.canvasCenter;

	const [gameGlobals, updateGameGlobals] = useState({
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
	})

	// Trivia-specific constants
	const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-yellow", "bg-purple", "bg-orange"]
	let cssClassIndex = 0;
	function getNextCssClass() {
		let cssClass = cssClasses[cssClassIndex];
		cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
		return cssClass;
	}


	// <> Gameboard building

	

	// Create a center hexagon
	const centerHexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }
	let [hexRoster, updateHexRoster] = useState([centerHexagon]);
	let boardRadius = 5;
	let tempHexData = [];
	for (let q = -boardRadius; q <= boardRadius; q++) {
		for (let r = -boardRadius; r <= boardRadius; r++) {
			if (q === 0 && r === 0) continue;
			tempHexData.push({ "q": q, "r": r, "cssClasses": `gameboard-space ${gameGlobals.getNextCssClass()}` })
		}
	}

	let tempHexRoster = tempHexData.map(hex => {
		// Give all the hexes a cssClasses if they don't already have one
		if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
		return hex;
	})

	// console.log(`hexRoster: ${JSON.stringify(hexRoster)}`)

	let buttonID=0
	let css='btn-success'

	return (
		<div className="App">
			<header className="App-header">
				<h1>Gameboard Maker</h1>
				<ErrorBoundary>
					{/* Form for setting gameGlobals */}
					<div className='border bg-green p-2 m-2'>
						<form >
							<label>Separation multiplier</label><input type="text" placeholder="1.0" />
							<label>Hex radius (px)</label><input type="text" placeholder="30px" />
							<button key={buttonID++} onClick={() => updateGameGlobals()}
								className={`btn p-3 m-2 ${css}`}>Update properties</button >
						</form>
					</div>
					{/* Form for setting hex roster */}
					<div className='border bg-gray p-2 m-2'>
						<form>
							<label>Board radius:</label><input type="range" value={3} min={1} max={10} />
							<button key={buttonID++} onClick={() => updateHexRoster()}
								className={`btn p-3 m-2 ${css}`}>Update board</button >
						</form>
					</div>
				</ErrorBoundary>
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