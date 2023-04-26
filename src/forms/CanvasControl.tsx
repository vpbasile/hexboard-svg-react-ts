
import { Dispatch } from "react";
import { coordinateXY } from "../helpers/hexDefinitions";
import ValueField from "../components/ValueField";
// import { useState } from 'react';

type myProps = {
	canvasWidth: number,
	SETcanvasWidth: Dispatch<number>,
	canvasHeight: number,
	SETcanvasHeight: Dispatch<number>,
	hexGridOrigin: coordinateXY
	SEThexGridOrigin: Dispatch<coordinateXY>
}

export default function CanvasControl(props: myProps) {
	const canvasWidth = props.canvasWidth; const canvasHeight = props.canvasHeight;
	// const hexGridOrigin = props.hexGridOrigin;
	// const [gridOriginTempX,SETgridOriginTempX] = useState(hexGridOrigin.x)
	// const [gridOriginTempY,SETgridOriginTempY] = useState(hexGridOrigin.y)
	const SETcanvasWidth = props.SETcanvasWidth;
	const SETcanvasHeight = props.SETcanvasHeight;
	// const SEThexGridOrigin = props.SEThexGridOrigin;

	return (<div id="canvasControlDiv" className="border bg-gray p-3">
		<h3>Canvas Parameters</h3>
		<div className="" id="canvasDimensionDiv">
			<ValueField
				fieldName="pickCanvasWidth"
				labelText="Canvas Width"
				type="number"
				defaultValue={canvasWidth}
				onChangeFunction={SETcanvasWidth} />
			<ValueField
				fieldName="pickCanvasHeight"
				labelText="Canvas Height"
				type="number"
				defaultValue={canvasHeight}
				onChangeFunction={SETcanvasHeight} />
		</div>
		{/* <div className="" id="gridOriginDiv">
			<ValueField
			fieldName="pickGridOriginX"
			labelText="Grid Origin x"
			type="number"
			defaultValue={gridOriginTempX}
			onChangeFunction={SETgridOriginTempX} />
			<ValueField
			fieldName="pickGridOriginY"
			labelText="Grid Origin y"
			type="number"
			defaultValue={gridOriginTempY}
			onChangeFunction={SETgridOriginTempY} />
			<button className={`btn bg-blue`} onClick={() => {} >Button</button>
		</div> */}
		{/* Needs the ability to set orientation */}
		{/* <p className="">You'll have to click a selector button above to re-render with the settigns you make on this form.  I'm working on fixing this.</p> */}
	</div>)
}