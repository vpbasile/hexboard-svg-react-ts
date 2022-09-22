import ArraySelect from "../forms/ArraySelect";
import GameBoard from "../components/HexBoardSVG";
import { useState } from "react";
import { gameGlobals, hexagon } from "../components/hexDefinitions";
import SaveRosterButton from "../forms/saveRoster";
import { cube_ring, hexOrientations } from "../components/hexFunctions";
import CanvasControl from "../forms/CanvasControl";

export default function CreateBoard(props: any) {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
	const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
	const [hexRadius, SEThexRadius] = useState(20);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [hexGridOrigin, SETgridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["flat-top"])

	// States unique to this board
	const [qTemp, SETqTemp] = useState(0);
	const [rTemp, SETrTemp] = useState(0);
	const cssClassChoices = [`just-grid`, `bg-white`, 'bg-green', 'bg-blue', 'bg-purple', 'bg-red']
	const [classTemp, SETclassTemp] = useState(cssClassChoices[0])
	// const blankRoster: hexagon[] = []
	const centerHex: hexagon = { q: 0, r: 0, cssClasses: cssClassChoices[0] }
	let tempRoster: hexagon[] = [centerHex]
	const boardSize: number = 7
	for (let i = 1; i < boardSize; i++) {
		const thisRing = cube_ring(centerHex, i)
		// console.log(`Ring ${i} is ${JSON.stringify(thisRing)}`)
		tempRoster = tempRoster.concat(thisRing);
		// console.log(JSON.stringify(tempRoster))
	}
	tempRoster = tempRoster.map((eachHex) => { eachHex.cssClasses = cssClassChoices[0]; return eachHex; })
	const [hexRoster, SEThexRoster] = useState<hexagon[]>(tempRoster)

	function addHex() {
		let tempRoster = Array.from(hexRoster)
		tempRoster.push({ q: qTemp, r: rTemp, cssClasses: classTemp })
		SEThexRoster(tempRoster);
	}

	let form = <div className="form-group border bg-orange p-3">
		<h3>Add Hex</h3>
		<div id="setQdiv">
			<label className="" htmlFor="qField">q:</label>
			<input className="form-control" name="qField" defaultValue={qTemp} onChange={(e) => SETqTemp(+e.target.value)} />
		</div>
		<div className="setRdiv">
			<label className="" htmlFor="rField">r:</label>
			<input className="form-control" name="rField" defaultValue={rTemp} onChange={(e) => SETrTemp(+e.target.value)} />
		</div>
		<div id="chooseClass">
			<ArraySelect
				choicesArray={cssClassChoices}
				onChange={SETclassTemp}
			/>
		</div>
		<div id="buttons">
			<button className="btn form-control bg-orange" onClick={() => addHex()}>Add</button>
		</div>
	</div>

	const gameGlobals: gameGlobals = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		// Hexagons
		orientation: defaultOrientation,
		hexGridOrigin: hexGridOrigin,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		// Style
		canvasBackgroundColor: '#000',
	}

	return (
		<div className="row" id="generativeContainer">
			<div id='createBoard' className="col-md-10">
				<GameBoard
					hexRoster={hexRoster}
					gameGlobals={gameGlobals}
					textSize={12}
					orientation={hexOrientations["flat-top"]}
				/>
			</div>
			<div id="sidebar" className="col-md-2">
				<SaveRosterButton
					hexRoster={hexRoster}
					gameGlobals={gameGlobals}
				/>
				{form}
				<CanvasControl
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					hexRadius={hexRadius}
					separationMultiplier={separationMultiplier}
					hexGridOrigin={hexGridOrigin}
					SETcanvasWidth={SETcanvasWidth}
					SETcanvasHeight={SETcanvasHeight}
					SEThexRadius={SEThexRadius}
					SETseparationMultiplier={SETseparationMultiplier} />
			</div>
		</div>
	)
}