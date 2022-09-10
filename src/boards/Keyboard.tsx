import ErrorBoundary from '../components/ErrorBoundary';
import GameBoard from '../components/HexBoardSVG';
import { canvasGlobals, hexagon } from '../components/hexDefinitions';


export default function Keyboard(props: { canvasGlobals: canvasGlobals; }) {
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

	const hexList: hexagon[] = [];

	let keyboardCharList = [`qwertyuiop[]`, `asdfghjkl;'`, `zxcvbnm,./`]
	keyboardCharList.forEach((row, rowIndex) => {
		Array.from(row).forEach((key, keyIndex) => {
			let thisOne: hexagon = { q: keyIndex, r: rowIndex, hexText: key }
			hexList.push(thisOne)

		})
	})

	const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-purple", "bg-orange"]
	let cssClassIndex = 0;
	function getNextCssClass() {
		let cssClass = cssClasses[cssClassIndex];
		cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
		return cssClass;
	}
	function colorHexes(hexes: hexagon[]) {
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
			<h3>Orientation: pointy-top</h3>
			<ErrorBoundary>
				<GameBoard
					hexRoster={keyboardHexes}
					canvasGlobals={canvasGlobals}
					gameGlobals={gameGlobals}
					textSize={gameGlobals.textSize}
					whichOrientation={"pointy-top"}
				//   logo={logo}
				/>
			</ErrorBoundary>
		</div>
	);
}