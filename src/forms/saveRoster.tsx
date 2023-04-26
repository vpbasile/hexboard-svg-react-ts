import { gameGlobals, hexagon } from "../helpers/hexDefinitions";

export default function SaveRosterButton(props: {
	hexRoster: hexagon[],
	gameGlobals: gameGlobals
}) {
	const hexRoster = props.hexRoster;
	const gameGlobals = props.gameGlobals;

	const saveRoster = (hexRoster: hexagon[]) => {

		let exportObject: { gameGlobals: gameGlobals, hexRoster: hexagon[] } = {
			gameGlobals: gameGlobals,
			hexRoster: hexRoster
		}
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(exportObject)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = "data.json";

		link.click();
	};

	// function exportSVG() {
	// 	let tempSVG = <svg viewBox={`0 0 ${gameGlobals.canvasWidth} ${gameGlobals.canvasHeight}`}
	// 	style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
	// 	xmlns="<http://www.w3.org/2000/svg>">
	// 		{}
	// 	</svg>

	// }

	return (<div className="bg-green p-3 border">
		<button className={`btn form-control m-1 bg-green`} onClick={() => saveRoster(hexRoster)} >Save Roster</button>
	</div>)
}