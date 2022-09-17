import { coordinateXY } from "../components/hexDefinitions";
import ValueField from "../components/ValueField";
// import { useState } from 'react';

export default function CanvasControl(props: {
	canvasWidth: number, canvasHeight: number, hexRadius: number, separationMultiplier: number, gridOrigin: coordinateXY
	SETcanvasWidth: any, SETcanvasHeight: any, SEThexRadius: any, SETseparationMultiplier: any,
	// setGridOrigin: any

}) {
	const canvasWidth = props.canvasWidth; const canvasHeight = props.canvasHeight;
	const hexRadius = props.hexRadius;
	const separationMultiplier = props.separationMultiplier;
	// const gridOrigin = props.gridOrigin;
	// const [gridOriginTempX,SETgridOriginTempX] = useState(gridOrigin.x)
	// const [gridOriginTempY,SETgridOriginTempY] = useState(gridOrigin.y)
	const SETcanvasWidth = props.SETcanvasWidth;
	const SETcanvasHeight = props.SETcanvasHeight;
	const SEThexRadius = props.SEThexRadius;
	const SETseparationMultiplier = props.SETseparationMultiplier;
	// const SETgridOrigin = props.setGridOrigin;

	return (<div id="canvasControlDiv" className="border bg-gray p-3">
		<h3>Canvas Parameters</h3>
		<div className="" id="canvasDimensionDiv">
			<div className="" id="pickSizeDiv">
				<ValueField
					fieldName="pickHexRadius"
					labelText="Hex Radius"
					type="number"
					defaultValue={hexRadius}
					onChangeFunction={SEThexRadius} />
			</div>
			<div className="" id="pickSeparationDiv">
				<label htmlFor='pickSeparation'>Separation multiplier: {separationMultiplier}</label>
				<input type='range' min='1' max='2' step='0.1' className='form-range'
					defaultValue={separationMultiplier} onChange={(e) => {
						console.log(`separationMultiplier: ${separationMultiplier}`)
						SETseparationMultiplier(+e.target.value)
						setTimeout(() => console.log(`separationMultiplier: ${separationMultiplier}`), 1000)
					}
					} />
			</div>
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