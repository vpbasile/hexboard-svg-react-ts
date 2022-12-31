//style
import './css/bootstrap.css';
import './css/color-dark.css';
import './css/shape-size.css';

// <> Import components
import ErrorBoundary from './helpers/ErrorBoundary';
import { hexagon } from './helpers/hexDefinitions';
import { hexOrientations } from './helpers/math-hex';
import { randomBounded, rollover } from './helpers/math';
import HexBoardSVG from './components/HexBoardSVG';
import { BranchObject, rolloverDirection } from './components/snowFlake';
import { colorList } from './css/classes';
import { centerHexagon } from './helpers/hexFunctions';

function App() {

  let currentColorIndex = 0;
  function nextColor(): string {
    const nextIndex = rollover(currentColorIndex++, colorList.length - 1);
    return colorList[nextIndex];
  }

  // Build the hex Roster
  // let originHex: hexagon = { q: 0, r: 0, cssClasses: "bg-white" }
  let hexRoster: hexagon[] = [centerHexagon]

  function mergeRoster(newHexes: hexagon[]): void { hexRoster = hexRoster.concat(newHexes); }

  // !!! Create snowflake roster
  const mainBranch = new BranchObject({ seed: { q: 0, r: 0 }, direction: 0, length: 30 }, nextColor());
  mergeRoster(mainBranch.roster);

  function growChild(parent:BranchObject) {
    const parentDirection = parent.direction
    const rando = randomBounded(0, parent.length);
    const childSeed = parent.roster[rando];
    const childLength = parent.length - rando;

    const childDeflection = randomBounded(1, 2);
    console.log(`parentDirection = ${parentDirection}`)
    console.log(`childDeflection = ${childDeflection}`)
    const childDirection = rolloverDirection(parentDirection - childDeflection);
    // const childDirection = rolloverDirection(parent.direction - childDeflection);
    console.log(`childDirection = ${childDirection}`)
    const testBranch = new BranchObject({ seed: { q: childSeed.q, r: childSeed.r }, direction: childDirection, length: childLength }, nextColor());
    return testBranch;
  }

  const firstChild = growChild(mainBranch);
  // const secondChild = growChild(firstChild);
  mergeRoster(firstChild.roster);
  // mergeRoster(secondChild.roster);

  // let snowFlakeArm = recurBranches(mainBranch, 0);
  // console.log(`Recursion complete.`)
  // console.log(`Original roster`)
  // console.log(`${JSON.stringify(hexRoster)}`);
  // mergeRoster(snowFlakeArm);
  // console.log(`Final roster`)
  // console.log(`${JSON.stringify(hexRoster)}`);


  //   mergeRoster(defineLine(branchPoint, directionVectors[2], tempSpot / 3, "bg-blue"));
  // mergeRoster(defineLine(branchPoint, directionVectors[4], tempSpot / 3, "bg-blue"));
  // tempSpot = Math.floor(branchLength / 2);
  // branchPoint = mainBranch[tempSpot];
  // mergeRoster(defineLine(branchPoint, directionVectors[1], tempSpot / 2, "bg-blue"));
  // mergeRoster(defineLine(branchPoint, directionVectors[5], tempSpot / 2, "bg-blue"));
  // tempSpot = Math.floor(3 * branchLength / 4);
  // branchPoint = mainBranch[tempSpot];
  // mergeRoster(defineLine(branchPoint, directionVectors[1], 3, "bg-blue"));
  // mergeRoster(defineLine(branchPoint, directionVectors[5], 3, "bg-blue"));

  // mergeRoster(hexplicate(hexRoster,nextColor))

  // Define the canvs
  const canvasDimension = 1100

  return (
    <div className="App container-fluid bg-black text-light p-4">
      <div className="row" id="page-content-row">
        <ErrorBoundary>
          <HexBoardSVG gameGlobals={{
            orientation: hexOrientations['flat-top'],
            hexRadius: 8,
            separationMultiplier: 1.02,
            textSize: 0,
            drawBackBoard: false,
            onClick: function (hex: hexagon, id: number, hexText?: string | undefined): {} {
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
      <div className="row" id="header">
        <div className="col-12">
        </div>
      </div>
    </div>
  )

}

export default App;