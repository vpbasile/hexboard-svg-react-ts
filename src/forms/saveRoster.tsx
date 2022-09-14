import * as hexDefinitions from "../components/hexDefinitions";

export default function SaveRosterButton(props: {
	hexRoster: hexDefinitions.hexagon[],
	gameGlobals:hexDefinitions.gameGlobals
}) {
	const hexRoster = props.hexRoster;
	const gameGlobals = props.gameGlobals;

	const saveRoster = (hexRoster: hexDefinitions.hexagon[]) => {

		let exportObject:{gameGlobals:hexDefinitions.gameGlobals, hexRoster:hexDefinitions.hexagon[]} = {
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

	return <button className={`btn form-control m-1 bg-cyan`} onClick={() => saveRoster(hexRoster)} >Save Roster</button>
}