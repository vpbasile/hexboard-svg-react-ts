export interface orientation { name: string; cornerAngles: number[]; }
export type orientationName = 'flat-top' | 'pointy-top'

export interface hexagon { q: number, r: number, cssClasses?: string, hexText?: string }
export interface vector { q: number, r: number }
export interface coordinateXY { x: number; y:number; }

export interface gameGlobals {
	// Canvas Globals
	canvasWidth: number,
	canvasHeight: number,
	// Hexagon propeties
	orientation: orientation,
	gridOrigin: { 'x': number, 'y': number },
	hexRadius: number,
	separationMultiplier: number,
	textSize: number,
	canvasBackgroundColor: string,
	// Hexagons
	// Style
}

export interface hexProps {
	gameGlobals: gameGlobals;
	id: number;
	q: number;
	r: number;
	cssClasses?: string;
	orientationName: orientationName;
	hexText?: string;
	hexTextSize?: number;
}

export interface gameBoardProps {
	gameGlobals: gameGlobals;
	hexRoster: hexagon[];
	textSize?: number;
	whichOrientation: orientationName;
}
