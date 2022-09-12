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
			gameGlobals={props}
		/>
	</div>

	return (<div className="row" id="generativeBoard">
		<h3>Orientation: flat-top</h3>
		<div id='generativeBoard' className="col-10">
			{form}
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