import { hexagon } from "../helpers/hexDefinitions";

export default function RosterDisplay(props: {hexRoster:hexagon[]}){
	const hexRoster = props.hexRoster
	let tableKeyNumber = 0
	return (
		<table className="table text-info">
			<thead>
				<tr>
					<th>key</th><th>q</th><th>r</th><th>css classes</th><th>text</th>
				</tr>
			</thead>
			<tbody>
				{hexRoster.map((hex:hexagon)=>{
					if (tableKeyNumber>30) {return null};
					return (<tr key={`tableRow-${tableKeyNumber}`} className={hex.cssClasses}>
						<td>{tableKeyNumber++}</td><td>{hex.q}</td><td>{hex.r}</td><td>{hex.cssClasses}</td><td>{hex.hexText}</td>
					</tr>)
				})}
			</tbody>
		</table>
	)
}