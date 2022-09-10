import { useState } from "react";
import ArraySelect from "../components/ArraySelect";
import GameBoard from "../components/HexBoardSVG";
import { canvasGlobals, gameGlobals, hexagon } from "../components/hexDefinitions";
import { hexOrientations } from "../components/hexFunctions";
import SaveRosterButton from "../forms/saveRoster";

export default function CreateBoard(props: { canvasGlobals: canvasGlobals }) {
	const [sizeOfSpaces, SETsizeOfSpaces] = useState(20);
	const [qTemp, SETqTemp] = useState(0);
	const [rTemp, SETrTemp] = useState(0);
	const cssClassChoices = [`bg-white`, 'bg-green', 'bg-blue', 'bg-purple', 'bg-red']
	const [classTemp, SETclassTemp] = useState(cssClassChoices[0])
	const blankRoster: hexagon[] = []
	const [hexRoster, SEThexRoster] = useState(blankRoster)

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
	}

	function addHex() {
		let tempRoster = Array.from(hexRoster)
		tempRoster.push({ q: qTemp, r: rTemp, cssClasses: classTemp })
		SEThexRoster(tempRoster);
	}

	let form = <div>
		<label htmlFor="qField">q:</label>
		<input name="qField" defaultValue={qTemp} onChange={(e) => SETqTemp(+e.target.value)} />
		<label htmlFor="rField">r:</label>
		<input name="rField" defaultValue={rTemp} onChange={(e) => SETrTemp(+e.target.value)} />
		<ArraySelect
			choicesArray={cssClassChoices}
			onChange={SETclassTemp}
		/>
		<button onClick={() => addHex()}>Add</button>
		<SaveRosterButton
			hexRoster={hexRoster}
			gameGlobals={gameGlobals}
		/>
	</div>

	return (<div className="row" id="generativeBoard">
		<h3>Orientation: flat-top</h3>
		<div id='generativeBoard' className="col-10">
			{form}
			<GameBoard
				hexRoster={hexRoster}
				canvasGlobals={props.canvasGlobals}
				gameGlobals={gameGlobals}
				textSize={gameGlobals.textSize}
				whichOrientation={"flat-top"}
			/>
		</div>
	</div>
	)
}