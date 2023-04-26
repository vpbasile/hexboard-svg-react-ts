import { coordinateXY } from "../helpers/hexDefinitions";
import ValueField from "../components/ValueField";
// import { useState } from 'react';

export default function BoardControl(props: {
	hexRadius: number, separationMultiplier: number
	SEThexRadius: any, SETseparationMultiplier: any,
	// SEThexGridOrigin: any

}) {
	const hexRadius = props.hexRadius;
	const separationMultiplier = props.separationMultiplier;
	const SEThexRadius = props.SEThexRadius;
	const SETseparationMultiplier = props.SETseparationMultiplier;
	// const SEThexGridOrigin = props.SEThexGridOrigin;

	return (<div id="canvasControlDiv" className="border bg-gray p-3">
		<h3>Board Parameters</h3>
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
		</div>
		{/* Needs the ability to set orientation */}
		{/* <p className="">You'll have to click a selector button above to re-render with the settigns you make on this form.  I'm working on fixing this.</p> */}
	</div>)
}