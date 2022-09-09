import { gameGlobals, canvasGlobals, hexagon } from "../components/hexDefinitions";

export default function SaveRosterButton(props: {
	hexRoster: hexagon[],
	gameGlobals:gameGlobals
}) {
	const hexRoster = props.hexRoster;
	const gameGlobals = props.gameGlobals;

	const saveRoster = (hexRoster: hexagon[]) => {
		let exp_canvasGlobals: canvasGlobals = {
			canvasWidth: 1000,
			canvasHeight: 1000,
			canvasCenter: { x: 0, y: 0 }
		}

		let exportObject = {
			canvasGlobals: exp_canvasGlobals,
			gameGlobals: gameGlobals,
			textSize: gameGlobals.textSize,
			whichOrientation: "flat-top",
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

	return <button className={`btn bg-cyan`} onClick={() => saveRoster(hexRoster)} >Save Roster</button>
}