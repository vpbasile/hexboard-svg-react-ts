//style
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

  // Build the hex Roster
  let hexRoster: hexagon[] = [centerHexagon]
  // FIX need to refactor this function so it can be used in this module and also hexFunctions
  function mergeRoster(newHexes: hexagon[]): void { hexRoster = hexRoster.concat(newHexes); }
  // Temporary override of growChildren function

  function growChildren(parent: BranchObject): void {
    for (let i = 1; i < parent.roster.length; i++) {
      const childSeed = parent.roster[i];
      // const childLength = 10;
      const childDirection = randomBounded(1, 2);
      let childLength: number;
      if (childDirection === 2) { childLength = randomBounded(1, Math.floor(i / 2)) }
      else { childLength = randomBounded(1, i) }
      const nextBranch = new BranchObject(
        { seed: { q: childSeed.q, r: childSeed.r }, direction: childDirection, length: childLength }, parent.direction, "bg-ice");
      mergeRoster(nextBranch.roster);
    }
  }

  // !!! Create snowflake roster
  const mainBranch = new BranchObject({ seed: { q: 0, r: 0 }, direction: 0, length: 30 }, null, "bg-ice");
  mergeRoster(mainBranch.roster);

  growChildren(mainBranch)
  const fullSnowflake = hexplicate(hexRoster);

  mergeRoster(fullSnowflake)
  fullSnowflake.forEach((hexagon) => { mergeRoster([reflectAcrossAxis(hexagon, "q", "bg-ice")]) })

  // Define the canvs
  const canvasDimension = 1500

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