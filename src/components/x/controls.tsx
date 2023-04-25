import { useState } from "react";
import { randomBounded } from "../../helpers/math";

const [seedIndex, setSeedIndex] = useState<number>(2);
const [childLength, setChildLength] = useState<number>(2);
const [childDirection, setChildDirection] = useState<number>(1);
export default function controls() {

	return (
		<div>
			<input id='seedIndex' type='number' value={seedIndex} onChange={e => {
				const newVal = +e.target.value;
				const parentLength = 30;
				if (newVal > (parentLength)) setSeedIndex(parentLength - 1);
				if (seedIndex < 1) setSeedIndex(1);
				else setSeedIndex(newVal);
				setChildDirection(randomBounded(1, 2));
				if (childDirection === 1) { setChildLength(randomBounded(1, seedIndex)) }
				if (childDirection === 2) { setChildLength(randomBounded(1, Math.floor(seedIndex / 2))) }
			}} />
			<input id='childLength' type='number' value={childLength} onChange={e => {
				const value: number = +e.target.value;
				if (value > 0 && value <= seedIndex) { setChildLength(value) }
				else { setChildLength(1) }
			}} />
		</div>
	)
}