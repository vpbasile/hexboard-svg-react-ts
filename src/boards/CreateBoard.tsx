import { useState } from "react";
import ArraySelect from "../components/ArraySelect";
import GameBoard from "../components/HexBoardSVG";
import { gameGlobals, hexagon } from "../components/hexDefinitions";
import SaveRosterButton from "../forms/saveRoster";

export default function CreateBoard(props: gameGlobals) {
	const [qTemp, SETqTemp] = useState(0);
	const [rTemp, SETrTemp] = useState(0);
	const cssClassChoices = [`bg-white`, 'bg-green', 'bg-blue', 'bg-purple', 'bg-red']
	const [classTemp, SETclassTemp] = useState(cssClassChoices[0])
	const blankRoster: hexagon[] = []
	const [hexRoster, SEThexRoster] = useState(blankRoster)

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
			<SaveRosterButton
				hexRoster={hexRoster}
				gameGlobals={props}
			/>
		</div>
	</div>

	return (
		<div className="row" id="generativeContainer">
			<div id="sidebar" className="col-2">
				{form}
			</div>
			<div id='createBoard' className="col-10">
				<GameBoard
					hexRoster={hexRoster}
					gameGlobals={props}
					textSize={props.textSize}
					whichOrientation={"flat-top"}
				/>
			</div>
		</div>
	)
}