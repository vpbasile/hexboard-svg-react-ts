import { useState } from 'react';

import { gameGlobals } from "../../components/hexDefinitions";
import ErrorBoundary from "../../components/ErrorBoundary";
import GameBoard from "../../components/HexBoardSVG";
import fileData from './map1.json';
import { hexOrientations } from '../../components/hexFunctions';
import CanvasControl from '../../components/CanvasControl';

export default function SavedBoard(props: any) {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
	const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
	const [hexRadius, SEThexRadius] = useState(20);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [gridOrigin, SETgridOrigin] = useState({ x: canvasWidth/2, y: canvasHeight/2 });
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["flat-top"])

	const hexRoster = fileData.hexRoster;
	// const canvasGlobals = fileData.canvasGlobals;

	const gameGlobals: gameGlobals = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		// Hexagons
		orientation: defaultOrientation,
		gridOrigin: gridOrigin,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		// Style
		canvasBackgroundColor: '#000',
	}

	return (
		<div className="row" id="savedBoardContainer">
			<div id="sideBar" className="col-2">
				<CanvasControl
					canvasWidth={canvasWidth}
					canvasHeight={canvasHeight}
					hexRadius={hexRadius}
					separationMultiplier={separationMultiplier}
					gridOrigin={gridOrigin}
					SETcanvasWidth={SETcanvasWidth}
					SETcanvasHeight={SETcanvasHeight}
					SEThexRadius={SEThexRadius}
					SETseparationMultiplier={SETseparationMultiplier} />
			</div>
			<div id='displayBoard' className="col-10">
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