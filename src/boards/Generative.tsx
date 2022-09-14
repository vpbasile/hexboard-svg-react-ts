import ErrorBoundary from "../components/ErrorBoundary";
import GameBoard from "../components/HexBoardSVG";
import { useState } from "react";

import { gameGlobals, hexagon, vector } from "../components/hexDefinitions";
import { alreadyThere, randomMove } from "../components/hexFunctions";
import RosterDisplay from "../components/RosterDisplay";
import SaveRosterButton from "../forms/saveRoster";

import '../css/gameboard.css'

export default function GenerativeBoard(props: gameGlobals) {

	const [numberOfSpaces, SETnumberOfSpaces] = useState(500);
	const [tempNumber, SETtempNumber] = useState(numberOfSpaces)
	const [hexRoster, SEThexRoster] = useState(newRoster())

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
		<div id="reRender" className="bg-blue p-3">
			<h3>Generation Parameters</h3>
			<label htmlFor="pickSpace">Number of cells: </label>
			<input type="number" className="form-control" defaultValue={numberOfSpaces} onChange={(e) => SETtempNumber(+e.target.value)} />
			<button className={`btn bg-blue`} onClick={() => {
				SETnumberOfSpaces(tempNumber);
				SEThexRoster(newRoster());
			}
			}>Re-shuffle</button >
			<SaveRosterButton
				hexRoster={hexRoster}
				gameGlobals={props}
			/>
		</div>

	return (
		<div className="row" id="generativeContainer">
			<div id="sidebar" className="col-2">
				{editForm}
				{props.children}
			</div>
			<div id='generativeBoard' className="col-10">
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						gameGlobals={props}
						textSize={props.textSize}
						whichOrientation={"flat-top"}
					//   logo={logo}
					/>
				</ErrorBoundary>
			</div>
			<div id="rosterDisplay" className="col-2">
				<RosterDisplay hexRoster={hexRoster} />
			</div>
			<div className="col-2" id="sidebar">
			</div>
		</div>
	);
}