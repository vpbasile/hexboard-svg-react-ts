import { coordinateXY, gameGlobals, hexagon } from "./hexDefinitions"
import { directionVectors } from "./hexFunctions"
const sqrt3 = Math.sqrt(3)
export function calcTheta(angle: number) { return angle * Math.PI / 180 }

export function hex_to_pixel(q: number, r: number, gameGlobals: gameGlobals): coordinateXY {
	let x: number
	let y: number
	const orientation = gameGlobals.orientation;
	const hexRadius = gameGlobals.hexRadius;
	const separationMultiplier = gameGlobals.separationMultiplier;
	const hexGridOrigin = gameGlobals.hexGridOrigin;
	if (orientation.name === "flat-top") {
		x = hexRadius * (3. / 2 * q)
		y = hexRadius * (sqrt3 / 2 * q + sqrt3 * r)
	}
	// else if (orientation.name === "pointy-top") {
	else {
		x = hexRadius * (sqrt3 * q + sqrt3 / 2 * r)
		y = hexRadius * (3. / 2 * r)
	}
	return { "x": x * separationMultiplier + hexGridOrigin.x, "y": y * separationMultiplier + hexGridOrigin.y }
}

export function canvasDimensions(hexData: hexagon[], gameGlobals: gameGlobals): any {
	// <> Find the min and max values for q and r.  Convert those to rectangular coordinates.  
	let maxRadius = 0
	hexData.forEach(hex => {
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
		if(returnString!==""){returnString+=" "}
		returnString += `${point.x},${point.y}`
	})
	return returnString;

}