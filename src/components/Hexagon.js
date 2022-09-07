import React from 'react';

// function degtoRad(degrees) { return degrees * Math.PI / 180 }

export default function Hexagon(props) {
	const sqrt3 = Math.sqrt(3)
	const gameGlobals = props.gameGlobals
	// Cache global variables
	const hexRadius = gameGlobals.hexRadius;
	const orientation = props.orientation
	// console.log(`orientation: ${JSON.stringify(orientation)}`)
	const cornerAngles = orientation.cornerAngles
	const gridOrigin = gameGlobals.gridOrigin;
	// Coordinates
	const q = props.q;
	const r = props.r;
	// const s = -q - r;
	// Math
	const separationMultiplier = props.gameGlobals.separationMultiplier
	const hexText = props.hexText

	function hex_to_pixel(q, r, orientation) {
		var x
		var y
		if (orientation.name === "flat-top") {
			x = hexRadius * (3. / 2 * q)
			y = hexRadius * (sqrt3 / 2 * q + sqrt3 * r)
		}
		else if (orientation.name === "pointy-top") {
			x = hexRadius * (sqrt3 * q + sqrt3 / 2 * r)
			y = hexRadius * (3. / 2 * r)
		}
		return { "x": x * separationMultiplier + gridOrigin.x, "y": y * separationMultiplier + gridOrigin.y }
	}
	const center = hex_to_pixel(q, r, orientation)

	// Find the X and Y of each corner
	var polygonString = ""
	cornerAngles.map(angle => {
		var theta = angle * Math.PI / 180
		const x = Math.floor(center.x + hexRadius * Math.cos(theta))
		const y = Math.floor(center.y + hexRadius * Math.sin(theta))
		// console.log(`corner: ${angle} ${x},${y}`)
		// if this is not the first corner, then we need to add a space
		if (polygonString !== "") { polygonString += " " }
		return polygonString += `${x},${y}`
	});


	// <> Event Handlers
	const handleClick = (e) => {
		console.log(`${hexText} hex ${props.id} clicked. q: ${q}, r: ${r}`)
	}

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
				fontSize={props.hexTextSize}
			>
				{hexText}
			</text>)
		}
	}
	const textForHex = displayText()

	// Make the SVG
	return (
		<g onClick={() => handleClick()}>
			<polygon
				style={{}}
				className={`hex ${cssClasses}`}
				id={props.id}
				points={polygonString}
			/>
			{textForHex}
		</g>
	)
}

	// 	// If there is a letter, then draw it and make the hex clickable
	// 	var currentLetter = this.letter
	// 	// If currentlter, then make it clickable
	// 	if (currentLetter == 'enter') {
	// 		gameBoard.fill(`white`)
	// 			.move(gridOrigin.x + this.center.x, gridOrigin.y + this.center.y - hexSize.y / 5)
	// 			.font({
	// 				family: 'monospace'
	// 				, weight: 'bold'
	// 				, size: 40
	// 				, anchor: 'middle'
	// 			})

	// 	}
	// 	if (currentLetter != undefined) {
	// 		var displayLetter = gameBoard.text(currentLetter)
	// 		displayLetter
	// 			// .attr('class', `${this.classes}`)
	// 			.fill(`white`)
	// 			.move(gridOrigin.x + this.center.x, gridOrigin.y + this.center.y - hexSize.y / 5)
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
	// 	var foundNeighbor = false
	// 	directionVectors.forEach(element => {
	// 		if (this.q + element.q == comparisonHex.q && this.r + element.r == comparisonHex.r) { foundNeighbor = true }
	// 	})
	// 	return foundNeighbor
	// }

	// assignLetter() {
	// 	var thisLetter = results.pop()
	// 	this.letter = thisLetter;
	// 	debug(`Assigning ${thisLetter} to hex ${this.id}`)
	// 	this.setClasses("clickable")
	// 	debug(`Hex ${this.id} has classes ${this.classes}`)
	// }
// } // End of class Hex

// <> Hex-altering Functions