import { coordinateXY } from "./hexDefinitions";

export default function CanvasControl(props: {
	canvasWidth: number, canvasHeight: number, hexRadius: number, separationMultiplier: number, gridOrigin: coordinateXY
	SETcanvasWidth: any, SETcanvasHeight: any, SEThexRadius: any, SETseparationMultiplier: any

}) {
	const canvasWidth = props.canvasWidth; const canvasHeight = props.canvasHeight;
	const hexRadius = props.hexRadius;
	const separationMultiplier = props.separationMultiplier;
	const SETcanvasWidth = props.SETcanvasWidth;
	const SETcanvasHeight = props.SETcanvasHeight;
	const SEThexRadius = props.SEThexRadius;
	const SETseparationMultiplier = props.SETseparationMultiplier;

	return (<div id="canvasControlDiv" className="border bg-gray p-3">
		<h3>Canvas Parameters</h3>
		<div className="" id="canvasDimensionDiv">
			<label htmlFor='pickCanvasWidth'>Canvas Width:</label>
			<input type='number' className='form-control' defaultValue={canvasWidth} onChange={(e) => SETcanvasWidth(+e.target.value)} />
			<label htmlFor='pickCanvasHeight'>Canvas Height:</label>
			<input type='number' className='form-control' defaultValue={canvasHeight} onChange={(e) => SETcanvasHeight(+e.target.value)} />
		</div>
		<div className="" id="pickSizeDiv">
			<label htmlFor="pickSize">Hex radius in px: </label>
			<input type="number" className='form-control' defaultValue={hexRadius} onChange={(e) => SEThexRadius(+e.target.value)} />
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
		{/* Needs the ability to set orientation */}
		<p className="">You'll have to click a selector button above to re-render with the settigns you make on this form.  I'm working on fixing this.</p>
	</div>)
}