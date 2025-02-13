import { useState } from "react";
import Winner from "../winner/Winner.jsx";
import RESULT_MATCH from '../../data.js';
import iconO from '../../assets/images/icon-o-yellow.svg';
import iconx from '../../assets/images/icon-x-blue.svg';

export default function BoardGame (){
    const INITIAL_BOARD = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];
    const SETUP_DATA = [
        ['topLeft','topMiddle','topRight'],
        ['centerLeft','centerMiddle','centerRight'],
        ['bottomLeft','bottomMiddle','bottomRight']
    ];
    
    const PLAYER1 = 0;
    const PLAYER2 = 1;
    
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1)
    const [square, setSquare] = useState(INITIAL_BOARD);
    const [result, setResult] = useState({});
    const [winner, setWinner] = useState(null);

    function handleCurrentPlayer (){
        currentPlayer === PLAYER1 ? setCurrentPlayer(PLAYER2) : setCurrentPlayer(PLAYER1)
        return currentPlayer
    }

    function handleChoice (row, col){

        let gameBoard = [...square.map(array => [...array])];

        if(!gameBoard[row][col]){
            let mark = handleCurrentPlayer()
            gameBoard[row][col] = <img src={mark === 0 ? iconx : iconO} alt="mark" className={mark}/>
        }

        setSquare(gameBoard)

        if(gameBoard[row][col] !== null){
            setResult((prevResult) => ({
             ...prevResult,
              [SETUP_DATA[row][col]] : gameBoard[row][col].props.className,
          }));
        }
        setWinner(gameBoard[row][col].props.className);
    }


    function checkWinner(sequence){
        
        let draw = square.every(row => row.every(item => item !== null));
        if(draw){
            return 'draw';
        }else{
            return RESULT_MATCH.some(match =>
                Object.keys(match).every(key=>match[key] === sequence[key])
            );
        } 
    };

    const winnerResult = checkWinner(result);

    return(
        <>
            <section className="boardgame-BoardGame">
                {INITIAL_BOARD.map((row, rowIndex) =>(
                    <div key={rowIndex} className="row-BoardGame">
                        {row.map((col, colIndex) =>(
                            <div key={colIndex} className="cell-BoardGame" onClick={() => handleChoice(rowIndex, colIndex)}>
                                {square[rowIndex][colIndex]}
                            </div>
                        ))}
                    </div>
                ))}                          
            </section>
            {winnerResult !== 'draw' && winnerResult ?
                                 <Winner winner={winner}/> : winnerResult === 'draw' ? <Winner winner={'draw'}/> : null}
        </>
    )
}