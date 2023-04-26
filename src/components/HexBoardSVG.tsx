// https://dev.to/sanity-io/how-to-use-svgs-in-react-3gof

import Hexagon from './Hexagon';
import ErrorBoundary from './ErrorBoundary';
import { canvasGlobals, coordinateXY, gameGlobals, hexagon } from '../helpers/hexDefinitions';
import { directionVectors, hex_to_pixel } from '../helpers/hexMath';
import { clickMessage } from '../helpers/hexFunctions';

export interface gameBoardProps {
	gameGlobals: gameGlobals;
	canvasGlobals: canvasGlobals;
	hexRoster: hexagon[];
	textSize?: number;
}

export default function GameBoard(props: gameBoardProps) {
	// Initialize variables
	const gameGlobals = props.gameGlobals;
	const hexRoster = props.hexRoster;
	const canvasGlobals = props.canvasGlobals;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasHeight = canvasGlobals.canvasHeight;
	const hexGridOrigin = canvasGlobals.hexGridOrigin;

	console.log(`Canvas size: ${Math.floor(canvasWidth)}, ${Math.floor(canvasHeight)}`)
	console.log(`Grid origin: ${Math.floor(hexGridOrigin.x)}, ${Math.floor(hexGridOrigin.y)}`)

	// <> Render Functions
	function backBoard(hexRoster: hexagon[], gameGlobals: gameGlobals): any {
		// <> Find the min and max values for q and r.  Convert those to rectangular coordinates.  
		let maxRadius = 0
		hexRoster.forEach(hex => {
			const q = hex.q;
			const r = hex.r;
			const s = -q - r;
			if (Math.abs(q) > maxRadius) { maxRadius = q }
			if (Math.abs(r) > maxRadius) { maxRadius = r }
			if (Math.abs(s) > maxRadius) { maxRadius = s }
		});
		maxRadius++;
		let cornerPoints: coordinateXY[] = directionVectors.map((vector) => {
			return hex_to_pixel(vector.q * maxRadius, vector.r * maxRadius, gameGlobals)
		})
		let returnString: string = ""
		cornerPoints.forEach((point) => {
			if (returnString !== "") { returnString += " " }
			returnString += `${point.x},${point.y}`
		})
		return returnString;

	}

	// <> Do some last minute things to the roster, like assigning unique ids if they are missing
	let hexKey = 0;
	const hexes = hexRoster.map((hex: hexagon) => {
		const thisHexKey = hexKey++;
		return <Hexagon
			gameGlobals={gameGlobals}
			key={thisHexKey}
			id={thisHexKey}
			q={hex.q}
			r={hex.r}
			cssClasses={hex.cssClasses}
			hexText={hex.hexText}
			clickMessage={clickMessage(hex,thisHexKey,hex.hexText)}
		/>
	})
	return (
		<ErrorBoundary boundaryName={"GameBoard"}>
			<div className="gameboard">
				<div className="gameboard-container">
					<p className='caption'></p>
					<div className="gameboard-canvas bg-gradient">
						<svg
							viewBox={`${-hexGridOrigin.x} ${-hexGridOrigin.y} ${canvasWidth} ${canvasHeight}`}
							style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
							xmlns="<http://www.w3.org/2000/svg>">
							{gameGlobals.drawBackBoard && <polygon
								style={{}}
								className={`just-grid`}
								id={`backboard`}
								points={backBoard(hexRoster, gameGlobals)}
							/>}
							{hexes}
						</svg>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	)
}