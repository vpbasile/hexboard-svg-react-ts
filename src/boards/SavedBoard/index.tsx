import { gameGlobals } from "../../components/hexDefinitions";
import ErrorBoundary from "../../components/ErrorBoundary";
import GameBoard from "../../components/HexBoardSVG";
import fileData from './map1.json';

export default function SavedBoard(props: gameGlobals) {
	const hexRoster = fileData.hexRoster;
	// const canvasGlobals = fileData.canvasGlobals;

	const gameGlobals:gameGlobals = {
		canvasWidth: props.canvasWidth,
		canvasHeight: props.canvasHeight,
		canvasCenter: {
			x: props.canvasCenter.x,
			y: props.canvasCenter.y
		},
		// Hexagons
		orientation: props.orientation,
		gridOrigin: props.gridOrigin,
		hexRadius: props.hexRadius,
		separationMultiplier: props.separationMultiplier,
		textSize: props.textSize,
		// Style
		canvasBackgroundColor: '#000',
	}

	return (
		<div className="row" id="generativeBoard">
			<h3>Orientation: flat-top</h3>
			<div id='displayBoard' className="col-12">
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						gameGlobals={gameGlobals}
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