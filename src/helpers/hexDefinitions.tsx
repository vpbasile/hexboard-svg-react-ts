export type orientation = { name: string; cornerAngles: number[]; }
export type orientationName = 'flat-top' | 'pointy-top'

export type hexagon = { q: number, r: number, cssClasses?: string, hexText?: string }
export type vector = { q: number, r: number }
export type direction = number; // ZZZ Should contrain to  0 | 1 | 2 | 3 | 4 | 5;
export type coordinateHex = { q: number, r: number }
export type coordinateXY = { x: number, y: number }

export type gameGlobals = {
	// Hexagon propeties
	orientation: orientation,
	hexRadius: number,
	separationMultiplier: number,
	textSize: number,
	drawBackBoard: boolean,
	onClick: hexClickFunction,
	// Children
	children?: any
}

export type canvasGlobals = {
	canvasWidth: number, canvasHeight: number,
	hexGridOrigin: coordinateXY,
	canvasBackgroundColor: string,
};

export type hexClickFunction = (hex:hexagon,id: number, hexText?: string)=>{}
