import { useState } from 'react';

import { canvasGlobals, gameGlobals } from "../../components/hexDefinitions";
import ErrorBoundary from "../../components/ErrorBoundary";
import GameBoard from "../../components/HexBoardSVG";
import fileData from './map1.json';
import { hexOrientations } from '../../components/hexMath';
import CanvasControl from '../../forms/CanvasControl';
import SaveRosterButton from '../../forms/saveRoster';
import BoardControl from '../../forms/BoardControl';

export default function SavedBoard(props: any) {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
	const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
	const [hexRadius, SEThexRadius] = useState(20);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
	const [defaultOrientation, SETdefaultOrientation] = useState(hexOrientations["flat-top"])

	const hexRoster = fileData.hexRoster;
	// const canvasGlobals = fileData.canvasGlobals;

	const gameGlobals: gameGlobals = {
		// Hexagons
		orientation: defaultOrientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: true,
	}

	const canvasGlobals: canvasGlobals = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		hexGridOrigin: hexGridOrigin,
		canvasBackgroundColor: '#000',
	}

	return (
		<div className="row" id="savedBoardContainer">
			<div id='displayBoard' className="col-md-10">
				<ErrorBoundary>
					<GameBoard
						hexRoster={hexRoster}
						gameGlobals={gameGlobals}
						canvasGlobals={canvasGlobals}
					//   logo={logo}
					/>
				</ErrorBoundary>
			</div>
			{/* <div id="rosterDisplay" className="">
				<RosterDisplay hexRoster={hexRoster} />
			</div> */}
			<div id="sideBar" className="col-md-2"><BoardControl
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

	);
}