// https://dev.to/sanity-io/how-to-use-svgs-in-react-3gof

import Hexagon from './Hexagon';
import ErrorBoundary from './ErrorBoundary';
import { coordinateXY, gameGlobals, hexagon, orientation } from './hexDefinitions';
import { canvasDimensions } from './hexMath'

export interface gameBoardProps {
	gameGlobals: gameGlobals;
	hexRoster: hexagon[];
	textSize?: number;
	orientation: orientation;
}

export default function GameBoard(props: gameBoardProps) {
	let gameGlobals = props.gameGlobals;
	let hexData = props.hexRoster;
	const orientation = props.orientation;
	const textSize = props.textSize;
	const calculatedDimensions = canvasDimensions(hexData, gameGlobals)
	const canvasWidth = gameGlobals.canvasWidth;
	const canvasHeight = gameGlobals.canvasHeight;
	const hexGridOrigin: coordinateXY = { x: canvasWidth, y: canvasHeight };
	// Initialize variables
	// const textSpacingHeight = props.textSize * 1.2

	// <> Render Functions
	console.log(`Canvas size: ${canvasWidth}, ${canvasHeight}`)
	console.log(`Grid origin: ${hexGridOrigin.x}, ${hexGridOrigin.y}`)

	// <> Do some last minute things to the data, like assigning unique ids if they are missing
	let hexKey = 0;
	const hexes = hexData.map((hex: hexagon) => {
		const thisHexKey = hexKey++;
		return <Hexagon
			gameGlobals={gameGlobals}
			key={thisHexKey}
			id={thisHexKey}
			q={hex.q}
			r={hex.r}
			cssClasses={hex.cssClasses}
			orientation={orientation}
			hexText={hex.hexText}
			hexTextSize={textSize}
		/>
	})
	return (
		<ErrorBoundary boundaryName={"GameBoard"}>
			<div className="gameboard">
				<div className="gameboard-container">
					<p className='caption'></p>
					<div className="gameboard-canvas bg-gradient">
						<svg
							viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
							style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
							xmlns="<http://www.w3.org/2000/svg>">
							<polygon
								style={{}}
								className={`just-grid`}
								id={`backboard`}
								points={calculatedDimensions}
							/>
							{hexes}
						</svg>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	)
}