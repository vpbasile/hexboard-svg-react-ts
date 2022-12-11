import { gameGlobals } from './hexDefinitions';
import { hex_to_pixel,calcTheta } from './math-hex';

// function degtoRad(degrees) { return degrees * Math.PI / 180 }

export interface hexProps {
	gameGlobals: gameGlobals;
	id: number;
	q: number;
	r: number;
	cssClasses?: string;
	hexText?: string;
	clickMessage: any;
}

export default function Hexagon(props:hexProps) {
	const gameGlobals = props.gameGlobals
	// Cache global variables
	const hexRadius = gameGlobals.hexRadius;
	const orientation = gameGlobals.orientation;
	const cornerAngles = orientation.cornerAngles
	// Coordinates
	const q = props.q;
	const r = props.r;
	// const s = -q - r;
	// Math
	const center = hex_to_pixel(q, r, gameGlobals)

	// Find the X and Y of each corner
	let polygonString = ""
	cornerAngles.map(angle => {
		const theta = calcTheta(angle)
		const x = Math.floor(center.x + hexRadius * Math.cos(theta))
		const y = Math.floor(center.y + hexRadius * Math.sin(theta))
		// console.log(`corner: ${angle} ${x},${y}`)
		// if this is not the first corner, then we need to add a space
		if (polygonString !== "") { polygonString += " " }
		return polygonString += `${x},${y}`
	});

	// CSS
	const cssClasses = props.cssClasses;


	// Make the SVG
	return (
		<g onClick={() => console.log(props.clickMessage)}>
			<polygon
				style={{}}
				className={`hex ${cssClasses}`}
				id={`${props.id}`}
				points={polygonString}
			/>
		</g>
	)
}