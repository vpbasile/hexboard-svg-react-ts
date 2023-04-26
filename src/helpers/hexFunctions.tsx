import { hexagon, vector } from "./hexDefinitions"
import { directionVectors, sCoordinate } from "./hexMath";

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
		hex.cssClasses = "hover-space bg-black"
	})
}

export function colorHexes(hexes: hexagon[], getNextCssClass: { (): string; }) {
	hexes.forEach(hex => { hex.cssClasses = `hover-space ${getNextCssClass()}` })
}

export function reflectAcrossAxis(hex:hexagon, axis: string, cssClasses?:string): hexagon {
	switch (axis) {
		// Yes I know this looks silly, but I haven;t fixed the method for calculating s
		case "q": return { q: hex.q, r: sCoordinate(hex), cssClasses };
		case "r": return { q: sCoordinate(hex), r: hex.r, cssClasses };
		default: return { q: hex.r, r: hex.q, cssClasses };
	}
}

// <><> Click Handlers

export function clickMessage(hex: hexagon, id: number, hexText?: string):string {
	if (hexText) { return (`${hexText} hex ${id} clicked. q: ${hex.q}, r: ${hex.r}`) }
	else { return (`Hex ${id} clicked. q: ${hex.q}, r: ${hex.r}`) }
}