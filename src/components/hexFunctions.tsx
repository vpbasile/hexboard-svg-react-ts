import { hexagon, vector } from "./hexDefinitions"

let hexOrientations = {
	"pointy-top": { "name": "pointy-top", "cornerAngles": [30, 90, 150, 210, 270, 330] },
	"flat-top": { "name": "flat-top", "cornerAngles": [0, 60, 120, 180, 240, 300] }
}

// Store all of the q,r directiom vector pairs in an array
export const directionVectors:vector[] = [
	{ "q": +1, "r": 0 },
	{ "q": +1, "r": -1 }, 
	{ "q": 0, "r": -1 }, 
	{ "q": -1, "r": 0 }, 
	{ "q": -1, "r": +1 }, 
	{ "q": 0, "r": +1 }
]

export function randomMove():vector { return directionVectors[Math.floor(6*Math.random())] }
export function alreadyThere(hexSearch:hexagon, roster:hexagon[]):boolean {
	if(roster.find((hexCompare:hexagon)=>(hexSearch.q === hexCompare.q)&&(hexSearch.r===hexCompare.r))){
		return true;
	}
	else return false;
}

export const centerHexagon: hexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }

// <> Hex Math functions
function cube_neighbor(center: hexagon, direction: number): hexagon {
	return { "q": center.q + directionVectors[direction].q, "r": center.r + directionVectors[direction].r }
}
function cube_scale(hex: hexagon, factor: number): hexagon { return { "q": hex.q * factor, "r": hex.r * factor } }
function cube_direction(direction: number) { return directionVectors[direction] }
function cube_add(hexA: hexagon, hexB: hexagon): hexagon { return { "q": hexA.q + hexB.q, "r": hexA.r + hexB.r } }

function cube_ring(center: hexagon, radius: number): hexagon[] {
	let results: hexagon[] = []
	let hex: hexagon = cube_add(center, cube_scale(cube_direction(4), radius))
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < radius; j++) {
			results.push(hex)
			hex = cube_neighbor(hex, i)
		}
	}
	return results
}

export { hexOrientations, cube_add, cube_direction, cube_neighbor, cube_ring }