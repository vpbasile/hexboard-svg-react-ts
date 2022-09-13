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
		<div className="col-10" id="savedBoard">
			<div id='displayBoard' className="">
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						gameGlobals={gameGlobals}
						whichOrientation={"flat-top"}
					//   logo={logo}
					/>
				</ErrorBoundary>
			</div>
			<div id="rosterDisplay" className="">
				{/* <RosterDisplay hexRoster={hexRoster} /> */}
			</div>
		</div>
	);
}