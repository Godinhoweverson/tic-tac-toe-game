export default function Score({player, points, color}){
    return(
        <div className="subBoxes-score" style={{backgroundColor:color}}>
            <p>{player}</p>
            <span>{points}</span>
        </div>
    )
}