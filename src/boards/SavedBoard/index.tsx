import { canvasGlobals } from "../../components/hexDefinitions";
import ErrorBoundary from "../../components/ErrorBoundary";
import GameBoard from "../../components/HexBoardSVG";
import fileData from './map1.json';

export default function SavedBoard(props: { canvasGlobals: canvasGlobals; }) {
	const hexRoster = fileData.hexRoster;
	const canvasGlobals = fileData.canvasGlobals;
	const gameGlobals = fileData.gameGlobals;

	return (
		<div className="row" id="generativeBoard">
			<h2>Generative board</h2>
			<h2>Orientation: flat-top</h2>
			<div id='displayBoard' className="col-12">
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
				{/* <RosterDisplay hexRoster={hexRoster} /> */}
			</div>
		</div>
	);
}