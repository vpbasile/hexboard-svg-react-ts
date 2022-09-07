import Hexagon from './Hexagon';
import ErrorBoundary from './ErrorBoundary';
import GameBoard from './GameBoard';

export default function Keyboard(props) {

	const canvasGlobals = props.canvasGlobals;
	const canvasHeight = canvasGlobals.canvasHeight;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasCenter = canvasGlobals.canvasCenter;

	// <> Gameboard Parameters
	const keyboardUnit = canvasWidth / 30;
	const gameGlobals = {
		// Utility
		canvasBackgroundColor: '#000',
		canvasCenter: canvasCenter,
		verbose: false,
		canvasHeight: canvasHeight,
		canvasWidth: canvasWidth,
		// Hexagons
		gridOrigin: { 'x': keyboardUnit, 'y': keyboardUnit },
		hexRadius: keyboardUnit,
		separationMultiplier: 1.1,
		textSize: keyboardUnit / 1.25,
		orientationName: "pointy-top",
		// Style
	}

	const hexList = [];

	let keyboardCharList = [`qwertyuiop[]`,`asdfghjkl;'`,`zxcvbnm,./`].forEach((row, rowIndex) => {
		Array.from(row).forEach((key, keyIndex) => {
			hexList.push({
				"q": keyIndex,
				"r": rowIndex,
				"hexText": key}
			)

		})
	})

	// for (let row = 0; row < 5; row++) {
	// 	for (let q = 0; q < 12; q++) {
	// 		hexList.push({
	// 			"q": q,
	// 			"r": row,
	// 			"hexText": keyboardCharList.shift(),
	// 		});
	// 	}
	// }

	const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-purple", "bg-orange"]
	let cssClassIndex = 0;
	function getNextCssClass() {
		let cssClass = cssClasses[cssClassIndex];
		cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
		return cssClass;
	}
	function colorHexes(hexes) {
		hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${getNextCssClass()}` })
	}

	colorHexes(hexList);


	const keyboardHexes = hexList.map(hex => {
		// Give all the hexes a cssClasses if they don't already have one
		if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
		return hex;
	})

	return (
		<div id='keyboard'>
			<h1>Keyboard</h1>
			<ErrorBoundary>
				<GameBoard
					hexRoster={keyboardHexes}
					canvasGlobals={canvasGlobals}
					gameGlobals={gameGlobals}
					rotation={"90deg"}
					textSize={`${gameGlobals.textSize}px`}
				//   logo={logo}
				/>
			</ErrorBoundary>
		</div>
	);
}