export default function consistentButton(text,css,onClick,key){
	return (
		<button value={""} className={`btn p-3 m-2 ${css}`} key={key} onClick={onClick}>{text}</button>
	  )
}