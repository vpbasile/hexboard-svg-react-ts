export function PageHeaderRow(props:{pageTitle:string,children:any}) {
	return (
		<div className="row" id="header">
			<div className="col-12">
				<h1>{props.pageTitle}</h1>
				{props.children}
			</div>
		</div>
	)
}

export function PageContentRow(props: {title?:string,children:any}){
	return (
		<div className="row" id="page-content-row">
			{props.title && <h2>{props.title}</h2>}
			{props.children}
		</div>
	)
}