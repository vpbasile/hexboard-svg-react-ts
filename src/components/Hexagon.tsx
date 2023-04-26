import { gameGlobals } from '../helpers/hexDefinitions';
import { clickMessage } from '../helpers/hexFunctions';
import { hex_to_pixel,calcTheta } from '../helpers/hexMath';

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
	const hexText = props.hexText
	const hexTextSize = gameGlobals.textSize;

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

	function displayText() {
		if (hexText !== undefined) {
			return (<text
				style={{ fill: "white" }}
				x={center.x}
				y={center.y}
				textAnchor="middle"
				alignmentBaseline="middle"
				fontSize={`${hexTextSize}px`}
			>
				{hexText}
			</text>)
		}
	}
	const textForHex = displayText()

	// Make the SVG
	return (
		<g onClick={() => console.log(props.clickMessage)}>
			<polygon
				style={{}}
				className={`hex ${cssClasses}`}
				id={`${props.id}`}
				points={polygonString}
			/>
			{textForHex}
		</g>
	)
}

	// 	// If there is a letter, then draw it and make the hex clickable
	// 	let currentLetter = this.letter
	// 	// If currentlter, then make it clickable
	// 	if (currentLetter == 'enter') {
	// 		gameBoard.fill(`white`)
	// 			.move(hexGridOrigin.x + this.center.x, hexGridOrigin.y + this.center.y - hexSize.y / 5)
	// 			.font({
	// 				family: 'monospace'
	// 				, weight: 'bold'
	// 				, size: 40
	// 				, anchor: 'middle'
	// 			})

	// 	}
	// 	if (currentLetter != undefined) {
	// 		let displayLetter = gameBoard.text(currentLetter)
	// 		displayLetter
	// 			// .attr('class', `${this.classes}`)
	// 			.fill(`white`)
	// 			.move(hexGridOrigin.x + this.center.x, hexGridOrigin.y + this.center.y - hexSize.y / 5)
	// 			.font({
	// 				family: 'monospace'
	// 				, weight: 'bold'
	// 				, size: 40
	// 				, anchor: 'middle'
	// 			})
	// 		displayLetter.on('click', function () {
	// 			debug(onClickString)
	// 			handleClick(id);
	// 		})
	// 	} else { if (firstload) { console.log(`Hex ${this.id} has no letter.`) } }
	// 	if (verbose) {
	// 		// presentationString += `${this.id}\n(${this.q},${this.r})`
	// 		// gameBoard.text(presentationString).fill('#fff').move(x - 1.5 * hexRadius, y - hexSize.y / 2)
	// 	}
	// }

	// isNeighbor(comparisonHex) {
	// 	let foundNeighbor = false
	// 	directionVectors.forEach(element => {
	// 		if (this.q + element.q == comparisonHex.q && this.r + element.r == comparisonHex.r) { foundNeighbor = true }
	// 	})
	// 	return foundNeighbor
	// }

	// assignLetter() {
	// 	let thisLetter = results.pop()
	// 	this.letter = thisLetter;
	// 	debug(`Assigning ${thisLetter} to hex ${this.id}`)
	// 	this.setClasses("clickable")
	// 	debug(`Hex ${this.id} has classes ${this.classes}`)
	// }
// } // End of class Hex