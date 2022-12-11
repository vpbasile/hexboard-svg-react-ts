//style
import './css/bootstrap.css';
import './css/color-dark.css';
import './css/shape-size.css';

// <> Import components
import ErrorBoundary from './components/ErrorBoundary';
import HexBoardSVG from './components/HexBoardSVG';
import { hexagon, vector } from './components/hexDefinitions';
import { directionVectors, hexOrientations } from './components/math-hex';
import { cssClassList } from './css/classes';
import { randomBounded } from './components/math';

function App() {
  // Build the hex Roster
  let originHex: hexagon = { q: 0, r: 0, cssClasses: "bg-white" }
  let hexRoster: hexagon[] = [originHex]

  function growArm(from: hexagon, direction: vector, length: number, cssClasses?: string): void {
    let newHexes = []
    // The 1th hex is the from hex plus one times the vector
    for (let i = 1; i <= length; i++) {
      let tempHex: hexagon = { q: from.q + i * direction.q, r: from.r + i * direction.r }
      if (cssClasses) { tempHex.cssClasses = cssClasses }
      newHexes.push(tempHex)
    }
    mergeRoster(newHexes)
  }

  function mergeRoster(newHexes: hexagon[]): void { hexRoster = hexRoster.concat(newHexes); }

  // Color spiral
  for (let tempDirection = 0; tempDirection < 6; tempDirection++) {
    growArm(originHex, directionVectors[tempDirection],
      tempDirection + 1,
      cssClassList[tempDirection + 1])
  }

  // type arm = { origin: hexagon, direction: vector, length: number }

  // const armOne = { origin:originHex, direction: directionVectors[randomBounded(0,5)], length:5 }
  // growArm(armOne.origin, armOne.direction, armOne.length, "bg-cyan");
  // // find the coordinates of a member of the existing arm

  // growArm()

  // function branchFromArm(arm: arm): void {
  //   const length = arm.length;
  //   if (length < 2) { }
  //   else {
  //     let branchPosition = randomBounded(length-1);
  //     let branchOrigin:hexagon = {
  //       q:arm.origin.q+
  //     }
  //     let branchDirection = randomBounded(2);
  //     growArm(branchOrigin,arm.direction+branchDirection,)
  //   }

  // }


  // function hexplicateArm() { }

  return (
    <div className="App container-fluid bg-black text-light p-4">
      <div className="row" id="page-content-row">
        <ErrorBoundary>
          <HexBoardSVG gameGlobals={{
            orientation: hexOrientations['flat-top'],
            hexRadius: 50,
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