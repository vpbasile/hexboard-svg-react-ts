import { coordinateHex, hexagon } from "../helpers/hexDefinitions";
import { randomBounded, rollover } from "../helpers/math";
import { directionVectors } from "../helpers/math-hex";

export type direction = number;
// ZZZ Should contrain to  0 | 1 | 2 | 3 | 4 | 5;

export type snowflakeBranch = {
	seed: coordinateHex,
	direction: direction,
	length: number
}

export class BranchObject {
	seed: coordinateHex;
	direction: number;
	length: number;
	roster: hexagon[];
	constructor(data: snowflakeBranch, cssClasses?: string) {
		this.seed = data.seed;
		this.direction = rolloverDirection(data.direction);
		this.length = data.length;
		this.roster = this.defineRoster(cssClasses);
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
		return lineRoster;
	}
}

export function rolloverDirection(value: number): direction { return (rollover(value, 5)) }

// export function recurBranches(parentBranch: BranchObject, parentLevel: number) {
// 	// !!! This is recursive, so we need a quit condition
// 	let newRoster = [...parentBranch.roster];
// 	const parentLength = newRoster.length;
// 	if (parentLength > 2) {
// 		// Choose a seed from the parent branch
// 		let childSeed = newRoster[randomBounded(1, parentLength - 1)];
// 		// Choose a direction
// 		let childDirection: direction = rolloverDirection(parentBranch.direction);
// 		// Choose a length
// 		let childLength = randomBounded(1, parentLength - 1);
// 		console.log(`${parentLevel}. Branching ${childLength} hexes in direction ${childDirection}`)
// 		let childObject = new BranchObject({ seed: childSeed, direction: childDirection, length: childLength }, "bg-red");
// 		const children = recurBranches(childObject, parentLevel + 1);
// 		newRoster.concat(children);
// 	}
// 	console.log(JSON.stringify(`Level ${parentLevel} roster`))
// 	console.log(`${JSON.stringify(newRoster)}`)
// 	return newRoster;
// }

// export function hexplicate(roster:hexagon[], colorFunction) {
// 	let newRoster: hexagon[] = []
// 	// HHH Reflect across the mainBranch

// 	// HHH Reflect across the origin
// 	roster.forEach((hex) => {
// 		newRoster.concat([{ q: -hex.q, r: -hex.r, cssClasses: colorFunction() }])
// 	})

// 	// HHH Rotate clones 60 degrees
// 	roster.forEach((hex) => {
// 		const twoHexes = [
// 			{ q: sCoordinate(hex), r: hex.q, cssClasses: colorFunction() },
// 			{ q: hex.r, r: sCoordinate(hex), cssClasses: colorFunction() }
// 		]
// 		newRoster.concat(twoHexes)
// 	})
// 	return newRoster;
// }