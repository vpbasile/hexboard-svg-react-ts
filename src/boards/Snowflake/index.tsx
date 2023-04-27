
// <> Import components
import { hexOrientations } from '../../helpers/hexMath';
import { randomBounded } from '../../helpers/math';
import { BranchObject, hexplicate } from './snowFlake';
import { centerHexagon, reflectAcrossAxis } from '../../helpers/hexFunctions';

import ErrorBoundary from '../../components/ErrorBoundary';
import { gameGlobals, hexagon } from '../../helpers/hexDefinitions';
import GameBoard from '../../components/HexBoardSVG';
// import BoardControl from '../../forms/BoardControl';
// import CanvasControl from '../../forms/CanvasControl';

export default function Snowflake(props: any) {
	// Define the canvas and snowflake properties
	const canvasDimension = 2500;
	const branchLength = 45;

	// Build the hex Roster
	let hexRoster: hexagon[] = [centerHexagon]
	function mergeRoster(newHexes: hexagon[]): void { hexRoster = hexRoster.concat(newHexes); }

	// Function for generating all of the randomized children of the mainBranch
	function growChildren(parent: BranchObject): void {
		for (let i = 1; i < parent.roster.length; i++) {
			const childSeed = parent.roster[i];
			const childDirection = randomBounded(1, 2);
			let childLength: number;
			if (childDirection === 2) { childLength = randomBounded(1, Math.floor(i / 2)) }
			else { childLength = randomBounded(1, i) }
			const nextBranch = new BranchObject(
				{ seed: { q: childSeed.q, r: childSeed.r }, direction: childDirection, length: childLength }, parent.direction, "bg-ice");
			mergeRoster(nextBranch.roster);
		}
	}

	// Define the main branch and add it to the roster
	const mainBranch = new BranchObject({ seed: { q: 0, r: 0 }, direction: 0, length: branchLength }, null, "bg-ice");
	mergeRoster(mainBranch.roster);

	// Generate the children
	growChildren(mainBranch)
	// Take the mainBranch and its children and do all of the reflections for symmetrical branches that then have sifold symmetry
	const fullSnowflake = hexplicate(hexRoster);
	mergeRoster(fullSnowflake)
	fullSnowflake.forEach((hexagon) => { mergeRoster([reflectAcrossAxis(hexagon, "q", "bg-ice")]) })

	const gameGlobals: gameGlobals = {
		orientation: hexOrientations['flat-top'],
		hexRadius: 8,
		separationMultiplier: 1.02,
		textSize: 0,
		drawBackBoard: false,
		onClick: function (): {} {
			throw new Error('Function not implemented.');
		},
	};

	const canvasGlobals = {
		canvasWidth: canvasDimension,
		canvasHeight: canvasDimension,
		hexGridOrigin: {
			x: canvasDimension / 2,
			y: canvasDimension / 2
		},
		canvasBackgroundColor: '000'
	}

	return (
		<div className="row" id="snowflakeBoardContainer">
			<div id='displayBoard' className="col-md-10">
				<ErrorBoundary>
					<GameBoard
						gameGlobals={gameGlobals}
						canvasGlobals={canvasGlobals}
						hexRoster={hexRoster}
						cssClasses={"viewHeight100"}
					/>
				</ErrorBoundary>
			</div>
			<div id="sideBar" className="col-md-2">
				<h2>Sidebar</h2>
				<p>This is the sidebar</p>
				{/* <BoardControl
					hexRadius={hexRadius}
					separationMultiplier={separationMultiplier}
					SEThexRadius={SEThexRadius}
					SETseparationMultiplier={SETseparationMultiplier} />
				<CanvasControl
					canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
					canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
					hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
				/> */}
			</div>
		</div>
	)
}