// https://dev.to/sanity-io/how-to-use-svgs-in-react-3gof

import Hexagon from './Hexagon';
import ErrorBoundary from './ErrorBoundary';
import './hexDefinitions'
import { gameBoardProps, hexagon } from './hexDefinitions';

export default function GameBoard(props: gameBoardProps) {
	let gameGlobals = props.gameGlobals;

	// Add some things to the gameGlobals
	const canvasGlobals = props.canvasGlobals;
	// console.log(`HexData: ${JSON.stringify(props.hexRoster)}`);
	let hexData = props.hexRoster;
	const gridOrigin = canvasGlobals.canvasCenter;

	// Initialize variables
	// const textSpacingHeight = props.textSize * 1.2

	// <> Render Functions
	console.log(`Canvas size: ${canvasGlobals.canvasWidth}, ${canvasGlobals.canvasHeight}`)
	console.log(`Grid origin: ${gridOrigin.x}, ${gridOrigin.y}`)

	// <> Do some last minute things to the data, like assigning unique ids if they are missing
	let hexKey = 0;
	const hexes = hexData.map((hex:hexagon) => {
		const thisHexKey = hexKey++;
		return <Hexagon
			gameGlobals={gameGlobals}
			canvasGlobals={canvasGlobals}
			key={thisHexKey}
			id={thisHexKey}
			q={hex.q}
			r={hex.r}
			cssClasses={hex.cssClasses}
			orientationName={props.whichOrientation}
			hexText={hex.hexText}
			hexTextSize={props.textSize}
		/>
	})
	return (
		<ErrorBoundary boundaryName={"GameBoard"}>
			<div className="gameboard">
				<div className="gameboard-container">
					<div className="gameboard-canvas">
						<svg
							viewBox={`0 0 ${canvasGlobals.canvasWidth} ${canvasGlobals.canvasHeight}`}
							style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
							xmlns="<http://www.w3.org/2000/svg>">
							{hexes}
						</svg>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	)
}