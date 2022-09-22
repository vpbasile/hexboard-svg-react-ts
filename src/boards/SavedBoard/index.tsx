import { useState } from 'react';

import { canvasGlobals, gameGlobals } from "../../components/hexDefinitions";
import ErrorBoundary from "../../components/ErrorBoundary";
import GameBoard from "../../components/HexBoardSVG";
import fileData from './data.json';
import { hexOrientations } from '../../components/hexMath';
import CanvasControl from '../../forms/CanvasControl';
import BoardControl from '../../forms/BoardControl';
import { clickMessage } from '../../components/hexFunctions';

export default function SavedBoard(props: any) {
	// <> States that control canvas parameters
	const [canvasWidth, SETcanvasWidth] = useState(window.innerWidth)
	const [canvasHeight, SETcanvasHeight] = useState(2 * window.innerHeight)
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
	const [orientation, SETorientation] = useState(hexOrientations["flat-top"])
	function toggleOrientation(): void {
		if (orientation===hexOrientations["flat-top"]){SETorientation(hexOrientations["pointy-top"])} else {
			SETorientation(hexOrientations["flat-top"])
		}
	}

	const hexRoster = fileData.hexRoster;
	// const canvasGlobals = fileData.canvasGlobals;

	const gameGlobals: gameGlobals = {
		// Hexagons
		orientation: orientation,
		hexRadius: hexRadius,
		separationMultiplier: separationMultiplier,
		textSize: 12,
		drawBackBoard: true,
		onClick:clickMessage
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