import { useState, useEffect } from "react";
import CONTAINERS_SCORES from '../../ScoreData.js';

export default function Score({winner, resetGame}){
    console.log(winner, resetGame)
    const [score, setScore] = useState({
        player1: 0,
        player2: 0,
        roundTie: 0
    });

    useEffect(() =>{
        if(winner !== null){
            handleScoreIncrease(winner)
        }
    },[winner]);

    function handleScoreIncrease(scoreUpdate, reset){
        if(!reset){
            setScore((prevScore) =>{
                if(scoreUpdate === 0){
                    return {...prevScore, player1: prevScore.player1 + 1}
                }else if( scoreUpdate === 1){
                    return {...prevScore, player2: prevScore.player2 + 1}
                }else{
                    return {...prevScore, roundTie: prevScore.roundTie + 1}
                } 
            });
        }
    };
    
    return(
    <footer className='container-score'>
        {CONTAINERS_SCORES.map((box) =>{
            return (
                <div className="subBoxes-score" key={box.id} style={{backgroundColor:box.color}}>
                    <p>{box.title}</p>
                    <span>
                        {score[box.name]}
                      </span>
                </div>
            )
        })}
    </footer>

      
    )
}
