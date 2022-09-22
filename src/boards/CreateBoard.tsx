import ArraySelect from "../forms/ArraySelect";
import GameBoard from "../components/HexBoardSVG";
import { useState } from "react";
import { gameGlobals, hexagon } from "../components/hexDefinitions";
import SaveRosterButton from "../forms/saveRoster";
import { calcCenteredRectangle, cube_ring, hexOrientations } from "../components/hexMath";
import CanvasControl from "../forms/CanvasControl";
import BoardControl from "../forms/BoardControl";
import aspectRatio from "../components/rectMath";

export default function CreateBoard(props: any) {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: true,
	}

	// <><><> Calculate the size of the canvas based on the hex roster
	const canvasDefaults = calcCenteredRectangle(hexRoster, gameGlobals)
	const [canvasHeight, SETcanvasHeight] = useState(canvasDefaults.canvasHeight * separationMultiplier)
	const [canvasWidth, SETcanvasWidth] = useState(canvasHeight * aspectRatio())
	// Since this is a centered board, we can calculate the origin based on the height and width
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });

	const canvasGlobals = {
		canvasWidth, canvasHeight, hexGridOrigin,
		canvasBackgroundColor: '#000'
	}

	return (
		<div className="row" id="generativeContainer">
			<div id='createBoard' className="col-md-10">
				<GameBoard
					hexRoster={hexRoster}
					gameGlobals={gameGlobals}
					canvasGlobals={canvasGlobals}
				/>
			</div>
			<div id="sidebar" className="col-md-2">
				<SaveRosterButton
					hexRoster={hexRoster}
					gameGlobals={gameGlobals}
				/>
				{form}
				<BoardControl
					hexRadius={hexRadius}
					separationMultiplier={separationMultiplier}
					SEThexRadius={SEThexRadius}
					SETseparationMultiplier={SETseparationMultiplier} />
				<CanvasControl
					canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
					canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
					hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
				/>
			</div>
		</div>
	)
}