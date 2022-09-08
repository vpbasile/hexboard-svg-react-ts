import GameBoard from '../components/HexBoardSVG';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Game(props) {

	const canvasGlobals = props.canvasGlobals;
	const canvasHeight = canvasGlobals.canvasHeight;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasCenter = canvasGlobals.canvasCenter;

	// <> Gameboard Parameters
	const gameGlobals = {
		// Utility
		canvasBackgroundColor: '#000',
		canvasCenter: canvasCenter,
		verbose: false,
		canvasHeight: canvasHeight,
		canvasWidth: canvasWidth,
		// Hexagons
		gridOrigin: canvasCenter,
		hexRadius: 30,
		separationMultiplier: 1.1,
		textSize: 50,
		orientationName: "flat-top",
		// Style
	}
	let gameHexes = [];

	return (
		<div id='game'>
			<h1>Game</h1>

			<ErrorBoundary>
				<GameBoard
					hexRoster={gameHexes}
					canvasGlobals={canvasGlobals}
					gameGlobals={gameGlobals}
				//   logo={logo}
				/>
			</ErrorBoundary>
		</div>
	);
}