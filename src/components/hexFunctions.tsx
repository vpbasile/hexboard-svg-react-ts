import { hexagon, vector } from "./hexDefinitions"
import { directionVectors } from "./hexMath";

export const centerHexagon: hexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }

export function randomMove(): vector { return directionVectors[Math.floor(6 * Math.random())] }
export function alreadyThere(hexSearch: hexagon, roster: hexagon[]): boolean {
	if (roster.find((hexCompare: hexagon) => (hexSearch.q === hexCompare.q) && (hexSearch.r === hexCompare.r))) {
		return true;
	}
	else return false;
}


// <><> Color Funcions
export function blackHexes(hexes: hexagon[]) {
	hexes.forEach(hex => {
		hex.cssClasses = "gameboard-space bg-black"
	})
}

export function colorHexes(hexes: hexagon[], getNextCssClass: { (): string; }) {
	hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${getNextCssClass()}` })
}