import { coordinateHex, direction, hexagon } from "../../helpers/hexDefinitions";
import { directionVectors, rolloverDirection, sCoordinate } from "../../helpers/hexMath";
import { reflectAcrossAxis } from '../../helpers/hexFunctions'

export type snowflakeBranch = {
	seed: coordinateHex,
	direction: direction,
	length: number
}

export class BranchObject {
	seed: coordinateHex;
	direction: number;
	parentDirection: null | number;
	length: number;
	roster: hexagon[];
	constructor(data: snowflakeBranch, parentDirection: null | number, cssClasses?: string) {
		this.seed = data.seed;
		this.direction = rolloverDirection(data.direction);
		this.length = data.length;
		this.roster = this.defineRoster(cssClasses);
		this.parentDirection = parentDirection;
	}

	defineRoster(cssClasses?: string) {
		const seedHex = this.seed;
		const length = this.length;
		const vector = directionVectors[this.direction];
		let lineRoster: hexagon[] = []
		for (let i = 1; i <= length; i++) {
			let tempHex: hexagon = { q: seedHex.q + i * vector.q, r: seedHex.r + i * vector.r };
			if (cssClasses) { tempHex.cssClasses = cssClasses; }
			lineRoster.push(tempHex);
		}

		// FIX HHH Reflect each of those hexes across the parent direction vector
		return lineRoster;
	}
}

export function hexplicate(roster: hexagon[]) {
	let newRoster: hexagon[] = [...roster]

	// HHH Reflect across the mainbranch, which coincides with the r-axis
	newRoster.forEach(hexagon => {
		newRoster = newRoster.concat(reflectAcrossAxis(hexagon,"r","bg-ice"))
	});

	// HHH Reflect across the origin
	newRoster.forEach((hex) => {
		newRoster = newRoster.concat([{ q: -hex.q, r: -hex.r, cssClasses: "bg-ice" }])
	})

	// HHH Rotate clones 60 degrees
	newRoster.forEach((hex) => {
		const twoHexes = [
			{ q: sCoordinate(hex), r: hex.q, cssClasses: "bg-ice" },
			{ q: hex.r, r: sCoordinate(hex), cssClasses: "bg-ice" }
		]
		newRoster = newRoster.concat(twoHexes)
	})
	return newRoster;
}

