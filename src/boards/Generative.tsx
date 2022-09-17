import ErrorBoundary from "../components/ErrorBoundary";
import GameBoard from "../components/HexBoardSVG";
import { useState } from "react";

import { gameGlobals, hexagon, vector } from "../components/hexDefinitions";
import { alreadyThere, hexOrientations, randomMove } from "../components/hexFunctions";
import RosterDisplay from "../components/RosterDisplay";
import SaveRosterButton from "../forms/saveRoster";

import '../css/gameboard.css'
import CanvasControl from "../forms/CanvasControl";

export default function GenerativeBoard(props: any) {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
	const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
	const [hexRadius, SEThexRadius] = useState(20);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [gridOrigin, SETgridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["flat-top"])

	const [numberOfSpaces, SETnumberOfSpaces] = useState(50);
	const [tempNumber, SETtempNumber] = useState(numberOfSpaces)
	const [hexRoster, SEThexRoster] = useState(newRoster())

	const gameGlobals: gameGlobals = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		// Hexagons
		orientation: defaultOrientation,
		gridOrigin: gridOrigin,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		// Style
		canvasBackgroundColor: '#000',
	}

	// Randomize color assignment so that 1/3 hexes are green
	function mapColor(): string {
		const rando = randomInt(25)
		if (rando === 1) return "bg-green"
		// if (rando === 2) return "bg-red"
		else return "bg-blue"
	}

	function randomInt(int: number): number {
		return Math.floor(int * Math.random())
	}

	function colorHexes(hexes: hexagon[]) {
		hexes.forEach(hex => { if (hex.cssClasses === undefined) hex.cssClasses = `gameboard-space ${mapColor()}` })
	}

	function newRoster(): hexagon[] {
		let tempHexList: hexagon[] = []
		let q = 0;
		let r = 0;
		tempHexList.push({ q: 0, r: 0, cssClasses: "gameboard-space bg-white" })
		for (let i = 0; i < numberOfSpaces; i++) {
			let found = false;
			let nextMove: vector = randomMove()
			// Prevent overlap
			while (!found) {
				q += nextMove.q;
				r += nextMove.r;
				found = !alreadyThere({ q, r }, tempHexList)
			}
			tempHexList.push({ q, r })
		}
		// Give the hexes some color
		colorHexes(tempHexList);
		return tempHexList;
	}

	// Interface for changing things

	const editForm =
		<div id="reRender" className="bg-blue p-3 border">
			<h3>Generation Parameters</h3>
			<label htmlFor="pickSpace">Number of cells: </label>
			<input type="number" className="form-control" defaultValue={tempNumber} onChange={(e) => { SETtempNumber(+e.target.value); SETnumberOfSpaces(tempNumber); SEThexRoster(newRoster()); }} />
			{/* <button className={`btn bg-blue`} onClick={() => {
				SETnumberOfSpaces(tempNumber);
				SEThexRoster(newRoster());
			}
			}>Re-shuffle</button > */}
		</div>

	return (
		<div className="row" id="generativeContainer">
			<div id='generativeBoard' className="col-md-10">
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						gameGlobals={gameGlobals}
						// textSize={props.textSize}
						whichOrientation={"flat-top"}
					//   logo={logo}
					/>
				</ErrorBoundary>
			</div>
			<div id="sidebar" className="col-md-2">
				<SaveRosterButton
					hexRoster={hexRoster}
					gameGlobals={gameGlobals}
				/>
				{editForm}
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

				{/* <RosterDisplay hexRoster={hexRoster} /> */}
			</div>
		</div>
	);
}