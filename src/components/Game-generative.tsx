import ErrorBoundary from "./ErrorBoundary";
import GameBoard from "./GameBoard";

import { hexagon } from "../TSinterfaces";

export default function GenerativeBoard(props: any) {

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

	// Create a center hexagon
	const centerHexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }
	hexList.concat(centerHexagon)

	colorHexes(hexList);


	// const keyboardHexes = hexList.map(hex => {
	// 	// Give all the hexes a cssClasses if they don't already have one
	// 	if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
	// 	return hex;
	// })

	return (
		<div id='generativeBoard'>
			<h1>Generative board</h1>
			<ErrorBoundary>
				<GameBoard
					hexRoster={hexList}
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