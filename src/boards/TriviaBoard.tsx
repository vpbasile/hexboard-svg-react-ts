import GameBoard from '../components/HexBoardSVG';
import ErrorBoundary from '../components/ErrorBoundary';
import { useState } from "react";
import { cube_ring, hexOrientations } from '../components/hexFunctions';
import { gameGlobals, hexagon } from '../components/hexDefinitions';
import CanvasControl from '../forms/CanvasControl';
const orientation = hexOrientations["pointy-top"];

export default function TriviaBoard(props: any) {
  // States unique to this board

  // Trivia-specific constants
  const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-yellow", "bg-purple", "bg-orange"]
  let cssClassIndex = 0;
  function getNextCssClass() {
    let cssClass = cssClasses[cssClassIndex];
    cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
    return cssClass;
  }

  // <> States that control canvas parameters
  const [canvasWidth, SETcanvasWidth] = useState(800)
  const [canvasHeight, SETcanvasHeight] = useState(800)
  const [hexRadius, SEThexRadius] = useState(20);
  const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
  const [hexGridOrigin, SETgridOrigin] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
  const [defaultOrientation, SETdefaultOrientation] = useState(orientation)

  let triviaHexes = [];

  // <> Utility
  // <> Helper and Math Functions


  // <> Gameboard building
  function blackHexes(hexes: hexagon[]) {
    hexes.forEach(hex => {
      hex.cssClasses = "gameboard-space bg-black"
    })
  }

  function colorHexes(hexes: hexagon[]) {
    hexes.forEach(hex => { hex.cssClasses = `gameboard-space ${getNextCssClass()}` })
  }

  // Create a center hexagon
  const centerHexagon = { "key": 0, "q": 0, "r": 0, "cssClasses": "gameboard-center bg-gray" }
  let hexData: hexagon[] = [centerHexagon]

  // First ring
  let ring1: hexagon[] = cube_ring({ "q": 0, "r": 0 }, 1);
  blackHexes(ring1);

  //Second ring
  let ring2: hexagon[] = cube_ring({ "q": 0, "r": 0 }, 2)
  colorHexes(ring2);

  // Third ring
  let ring3: hexagon[] = cube_ring({ "q": 0, "r": 0 }, 3)
  blackHexes(ring3);

  // Fourth ring
  let ring4: hexagon[] = cube_ring({ "q": 0, "r": 0 }, 4)
  colorHexes(ring4);

  // Gather the different rings together
  hexData = hexData.concat(ring1);
  hexData = hexData.concat(ring2);
  hexData = hexData.concat(ring3);
  hexData = hexData.concat(ring4);

  triviaHexes = hexData.map(hex => {
    // Give all the hexes a cssClasses if they don't already have one
    if (hex.cssClasses === undefined) { hex.cssClasses = "gameboard-space bg-gray" }
    return hex;
  })

  const gameGlobals: gameGlobals = {
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    // Hexagons
    orientation: defaultOrientation,
    hexGridOrigin: hexGridOrigin,
    hexRadius: hexRadius,
    separationMultiplier: separationMultiplier,
    textSize: 12,
    // Style
    canvasBackgroundColor: '#000',
  }

  return (

    <div className="row" id="triviaBoardContainer">
      <div id='displayBoard' className="col-md-10">
        <ErrorBoundary>
          <GameBoard
            hexRoster={triviaHexes}
            gameGlobals={gameGlobals}
            orientation={orientation}

          //   logo={logo}
          />
        </ErrorBoundary>
      </div>
      <div id="sideBar" className="col-md-2">

        <CanvasControl
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          hexRadius={hexRadius}
          separationMultiplier={separationMultiplier}
          hexGridOrigin={hexGridOrigin}
          SETcanvasWidth={SETcanvasWidth}
          SETcanvasHeight={SETcanvasHeight}
          SEThexRadius={SEThexRadius}
          SETseparationMultiplier={SETseparationMultiplier} />
      </div>
    </div>
  );
}