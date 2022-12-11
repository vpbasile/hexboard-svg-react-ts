//style
import './css/bootstrap.css';
import './css/color-dark.css';
import './css/shape-size.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';
import HexBoardSVG from './components/HexBoardSVG';
import { hexagon, vector } from './components/hexDefinitions';
import { directionVectors, hexOrientations, sCoordinate } from './components/math-hex';
import { cssClassList } from './css/classes';
import { randomBounded } from './components/math';

function App() {
  // Build the hex Roster
  let originHex: hexagon = { q: 0, r: 0, cssClasses: "bg-white" }
  let hexRoster: hexagon[] = [originHex]

  function defineLine(from: hexagon, direction: vector, length: number, cssClasses?: string) {
    let lineRoster: hexagon[] = []
    for (let i = 1; i <= length; i++) {
      let tempHex: hexagon = { q: from.q + i * direction.q, r: from.r + i * direction.r };
      if (cssClasses) { tempHex.cssClasses = cssClasses; }
      lineRoster.push(tempHex);
    }
    return lineRoster;
  }

  function mergeRoster(newHexes: hexagon[]): void { hexRoster = hexRoster.concat(newHexes); }

  const branchLength = 30

  const mainBranch = defineLine({ q: 0, r: 0 }, directionVectors[0], branchLength, "bg-cyan");
  mergeRoster(mainBranch);
  let tempSpot = Math.floor(branchLength/3);
  let branchPoint = mainBranch[tempSpot];
  mergeRoster(defineLine(branchPoint, directionVectors[2], tempSpot/3, "bg-blue"));
  mergeRoster(defineLine(branchPoint, directionVectors[4], tempSpot/3, "bg-blue"));
  tempSpot = Math.floor(branchLength/2);
  branchPoint = mainBranch[tempSpot];
  mergeRoster(defineLine(branchPoint, directionVectors[1], tempSpot/2, "bg-blue"));
  mergeRoster(defineLine(branchPoint, directionVectors[5], tempSpot/2, "bg-blue"));
  tempSpot = Math.floor(3*branchLength/4);
  branchPoint = mainBranch[tempSpot];
  mergeRoster(defineLine(branchPoint, directionVectors[1], 3, "bg-blue"));
  mergeRoster(defineLine(branchPoint, directionVectors[5], 3, "bg-blue"));

  // Reflect across the origin
  hexRoster.forEach((hex) => {
    mergeRoster([{ q: -hex.q, r: -hex.r, cssClasses: hex.cssClasses }])
  })

  // Rotate clones 60 degrees
  hexRoster.forEach((hex) => {
    mergeRoster([
      { q: sCoordinate(hex), r: hex.q, cssClasses: hex.cssClasses },
      { q: hex.r, r: sCoordinate(hex), cssClasses: hex.cssClasses }
    ])
  })

  return (
    <div className="App container-fluid bg-black text-light p-4">
      <div className="row" id="page-content-row">
        <ErrorBoundary>
          <HexBoardSVG gameGlobals={{
            orientation: hexOrientations['flat-top'],
            hexRadius: 5,
            separationMultiplier: 1,
            textSize: 0,
            drawBackBoard: false,
            onClick: function (hex: hexagon, id: number, hexText?: string | undefined): {} {
              throw new Error('Function not implemented.');
            },
          }} canvasGlobals={{
            canvasWidth: 1000,
            canvasHeight: 1000,
            hexGridOrigin: {
              x: 1000 / 2,
              y: 1000 / 2
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