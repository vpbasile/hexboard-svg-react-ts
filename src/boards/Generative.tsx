import ErrorBoundary from "../components/ErrorBoundary";
import GameBoard from "../components/HexBoardSVG";
import { useState } from "react";

import { hexagon, vector } from "../components/hexDefinitions";
import { alreadyThere, hexOrientations, randomMove } from "../components/hexFunctions";

export default function GenerativeBoard(props: any) {

	const [numberOfSpaces, SETnumberOfSpaces] = useState(30);
	const [sizeOfSpaces, SETsizeOfSpaces] = useState(30);

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
		orientation: hexOrientations["flat-top"],
		gridOrigin: { 'x': canvasWidth / 2, 'y': canvasHeight / 2 },
		hexRadius: sizeOfSpaces,
		separationMultiplier: 1.1,
		textSize: sizeOfSpaces / 1.25
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

	let q = 0;
	let r = 0;
	for (let i = 0; i < numberOfSpaces; i++) {
		let found = false;
		let nextMove: vector = randomMove()
		// Prevent overlap
		while (!found) {
			q += nextMove.q;
			r += nextMove.r;
			found = !alreadyThere({ q, r }, hexList)
		}
		console.log(`q:${q},r:${r}`)
		hexList.push({ q, r })
	}

	// Give the hexes some color
	colorHexes(hexList);

	// Interface for changing things
	const numberPicker =
		<div>
			<label htmlFor="pickSpace">Number of cells: </label>
			<input type="number" defaultValue={numberOfSpaces} onChange={(e) => SETnumberOfSpaces(+e.target.value)} />
		</div>

	const sizePicker = 
	<div>
		<label htmlFor="pickSize">Size in px: </label>
		<input type="number" defaultValue={sizeOfSpaces} onChange={(e) => SETsizeOfSpaces(+e.target.value)} />
	</div>

	return (
		<div id='generativeBoard'>
			<h1>Generative board</h1>
			<h2>Orientation: flat-top</h2>
			{numberPicker}
			{sizePicker}
			<ErrorBoundary>
				<GameBoard
					hexRoster={hexList}
					canvasGlobals={canvasGlobals}
					gameGlobals={gameGlobals}
					rotation={"90deg"}
					textSize={gameGlobals.textSize}
					whichOrientation={"flat-top"}
				//   logo={logo}
				/>
			</ErrorBoundary>
		</div>
	);
}