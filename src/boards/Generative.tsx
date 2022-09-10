import ErrorBoundary from "../components/ErrorBoundary";
import GameBoard from "../components/HexBoardSVG";
import { useState } from "react";

import { canvasGlobals, hexagon, vector } from "../components/hexDefinitions";
import { alreadyThere, hexOrientations, randomMove } from "../components/hexFunctions";
import RosterDisplay from "../components/RosterDisplay";
import SaveRosterButton from "../forms/saveRoster";

import '../css/gameboard.css'

export default function GenerativeBoard(props: { canvasGlobals: canvasGlobals; }) {

	const [sizeOfSpaces, SETsizeOfSpaces] = useState(20);
	const [numberOfSpaces, SETnumberOfSpaces] = useState(500);
	const [tempNumber, SETtempNumber] = useState(numberOfSpaces)
	const [hexRoster, SEThexRoster] = useState(newRoster())
	const [exportDimensions, SETexportDimension] = useState({xmin:0,xmax:0,ymin:0,ymax:0})

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

	const editForm = <div className="row">
		<div id="reRender" className="bg-blue col-6 p-2">
			<label htmlFor="pickSpace">Number of cells: </label>
			<input type="number" defaultValue={numberOfSpaces} onChange={(e) => SETtempNumber(+e.target.value)} />
			<button className={`btn bg-blue`} onClick={() => {
				SETnumberOfSpaces(tempNumber);
				SEThexRoster(newRoster());
			}
			}>Re-shuffle</button >
			<SaveRosterButton
				hexRoster={hexRoster}
				gameGlobals={gameGlobals}
			/>
		</div>
		<div id="cosmeticChange" className="bg-green col-6 p-2">
			<label htmlFor="pickSize">Size in px: </label>
			<input type="number" defaultValue={sizeOfSpaces} onChange={(e) => SETsizeOfSpaces(+e.target.value)} />
		</div>
	</div>

	return (
		<div className="row" id="generativeBoard">
			<h3>Orientation: flat-top</h3>
			<div id='generativeBoard' className="col-10">
				{editForm}
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						canvasGlobals={canvasGlobals}
						gameGlobals={gameGlobals}
						textSize={gameGlobals.textSize}
						whichOrientation={"flat-top"}
					//   logo={logo}
					/>
				</ErrorBoundary>
			</div>
			<div id="rosterDisplay" className="col-2">
				<RosterDisplay hexRoster={hexRoster} />
			</div>
		</div>
	);
}