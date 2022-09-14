import ErrorBoundary from '../components/ErrorBoundary';
import GameBoard from '../components/HexBoardSVG';
import { useState } from "react";
import { gameGlobals, hexagon } from '../components/hexDefinitions';
import { hexOrientations } from '../components/hexFunctions';
import CanvasControl from '../components/CanvasControl';


export default function Keyboard(props: any) {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
	const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
	const [hexRadius, SEThexRadius] = useState(20);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [gridOrigin, SETgridOrigin] = useState({ x: 100, y: 100 });
	const orientation = hexOrientations["flat-top"]

	// States unique to this board

	// <> Gameboard Parameters
	const gameGlobals: gameGlobals = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		// Hexagons
		orientation: orientation,
		gridOrigin: gridOrigin,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		// Style
		canvasBackgroundColor: '#000',
	}
	// <> Create the roster of hexes
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
		<div className="row" id="displayBoardContainer">
			<div id="sideBar" className="col-2">
				
				<CanvasControl
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					hexRadius={hexRadius}
					separationMultiplier={separationMultiplier}
					gridOrigin={gridOrigin}
					SETcanvasWidth={SETcanvasWidth}
					SETcanvasHeight={SETcanvasHeight}
					SEThexRadius={SEThexRadius}
					SETseparationMultiplier={SETseparationMultiplier} />
			</div>
			<div id='displayBoard' className="col-10">

				<ErrorBoundary>
					<GameBoard
						hexRoster={keyboardHexes}
						gameGlobals={gameGlobals}
						textSize={props.textSize}
						whichOrientation={"pointy-top"}
					//   logo={logo}
					/>
				</ErrorBoundary>
			</div>
		</div>

	);
}