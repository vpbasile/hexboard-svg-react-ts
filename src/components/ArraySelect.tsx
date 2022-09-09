export default function ArraySelect(props: { choicesArray: string[], onChange: any, cssClasses?:string }) {
	const choicesArray = props.choicesArray;
	const onChange = props.onChange
	const options = choicesArray.map(
		(thisValue) => {
			return (<option key={thisValue} value={thisValue}>{thisValue}</option>)
		}
	)
	return (
		<select className={`form-select ${props.cssClasses}`} onChange={e=>onChange(e.target.value)}>
			{options}
		</select>
	)

}