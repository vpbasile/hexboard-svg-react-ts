// <> <> Hexboard generates a randomized snowflake on a hexagonal grid with coordinates (q,r)

// <> Import stylesheets
import './css/bootstrap.css';
import './css/color-dark.css';
import './css/shape-size.css';

// <> Import components
import ErrorBoundary from './helpers/ErrorBoundary';
import { hexagon } from './helpers/hexDefinitions';
import { hexOrientations } from './helpers/math-hex';
import { randomBounded } from './helpers/math';
import HexBoardSVG from './components/HexBoardSVG';
import { BranchObject, hexplicate } from './components/snowFlake';
import { centerHexagon, reflectAcrossAxis } from './helpers/hexFunctions';

export default function App() {

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

  // Define the main branch and add it ot the roster
  const mainBranch = new BranchObject({ seed: { q: 0, r: 0 }, direction: 0, length: branchLength }, null, "bg-ice");
  mergeRoster(mainBranch.roster);

  // Generate the children
  growChildren(mainBranch)
  // Take the mainBranch and its children and do all of the reflections for symmetrical branches that then have sifold symmetry
  const fullSnowflake = hexplicate(hexRoster);
  mergeRoster(fullSnowflake)
  fullSnowflake.forEach((hexagon) => { mergeRoster([reflectAcrossAxis(hexagon, "q", "bg-ice")]) })


  return (
    <div className="App container-fluid bg-black text-light p-4">
      <div>


      </div>
      <div className="row" id="page-content-row">
        <ErrorBoundary>
          <HexBoardSVG gameGlobals={{
            orientation: hexOrientations['flat-top'],
            hexRadius: 8,
            separationMultiplier: 1.02,
            textSize: 0,
            drawBackBoard: false,
            onClick: function (): {} {
              throw new Error('Function not implemented.');
            },
          }} canvasGlobals={{
            canvasWidth: canvasDimension,
            canvasHeight: canvasDimension,
            hexGridOrigin: {
              x: canvasDimension / 2,
              y: canvasDimension / 2
            },
            canvasBackgroundColor: '000'
          }} hexRoster={hexRoster}

          />
        </ErrorBoundary>
      </div>
      {/* <div className="row" id="header">
        <div className="col-12 text-ice">
          <a href='https://www.redblobgames.com/grids/hexagons/'>Special thanks to Red Blob Games!</a>
        </div>
      </div> */}
    </div>
  )

}