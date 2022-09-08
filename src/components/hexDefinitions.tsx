export interface orientation { name: string; cornerAngles: number[]; }
export type orientationName = 'flat-top' | 'pointy-top'

export interface hexagon { q: number, r: number, cssClasses?: string, hexText?: string }
export interface vector { q:number, r: number }

export interface hexProps {
	gameGlobals: gameGlobals;
	canvasGlobals: canvasGlobals;
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
	canvasGlobals: canvasGlobals;
	hexRoster: hexagon[];
	rotation: string;
	textSize?: number;
	whichOrientation: orientationName;
}

export interface canvasGlobals {
	canvasWidth: number,
	canvasHeight: number,
	canvasCenter: { 'x': number, 'y': number }
}

export interface gameGlobals {
	// Utility
	canvasBackgroundColor: string,
	canvasCenter: { 'x': number, 'y': number },
	verbose: boolean,
	canvasHeight: number,
	canvasWidth: number,
	// Hexagons
	gridOrigin: { 'x': number, 'y': number },
	hexRadius: number,
	separationMultiplier: number,
	textSize: number
}