import ErrorBoundary from '../components/ErrorBoundary';
import GameBoard from '../components/HexBoardSVG';
import { gameGlobals, hexagon } from '../components/hexDefinitions';


export default function Keyboard(props: gameGlobals ) {

	// <> Gameboard Parameters

	const hexList: hexagon[] = [];

	let keyboardCharList = [`qwertyuiop[]`, `asdfghjkl;'`, `zxcvbnm,./`]
	keyboardCharList.forEach((row, rowIndex) => {
		Array.from(row).forEach((key, keyIndex) => {
			let thisOne: hexagon = { q: keyIndex, r: rowIndex, hexText: key }
			hexList.push(thisOne)

		})
	})

	const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-purple", "bg-orange"]
	let cssClassIndex = 0;
	function getNextCssClass() {
		let cssClass = cssClasses[cssClassIndex];
		cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
		return cssClass;
	}
	function colorHexes(hexes: hexagon[]) {
		hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${getNextCssClass()}` })
	}

	colorHexes(hexList);


	const keyboardHexes = hexList.map(hex => {
		// Give all the hexes a cssClasses if they don't already have one
		if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
		return hex;
	})

	return (
		<div id='keyboard' className='col-10'>
			<ErrorBoundary>
				<GameBoard
					hexRoster={keyboardHexes}
					gameGlobals={props}
					textSize={props.textSize}
					whichOrientation={"pointy-top"}
				//   logo={logo}
				/>
			</ErrorBoundary>
		</div>
	);
}