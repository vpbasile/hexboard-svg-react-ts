import { hexagon, vector } from "./hexDefinitions"
import { randomBounded } from "./math";
import { directionVectors } from "./math-hex";

export const centerHexagon: hexagon = { "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }

export function randomMove(): vector { return directionVectors[randomBounded(0,6)] }

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

// <><> Click Handlers

export function clickMessage(hex: hexagon, id: number, hexText?: string):string {
	if (hexText) { return (`${hexText} hex ${id} clicked. q: ${hex.q}, r: ${hex.r}`) }
	else { return (`Hex ${id} clicked. q: ${hex.q}, r: ${hex.r}`) }
}