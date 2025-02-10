import { useState } from "react";
import iconO from '../../assets/images/icon-o-yellow.svg';
import iconx from '../../assets/images/icon-x-blue.svg';

export default function BoardGame (){
    const INITIAL_BOARD = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];

    const PLAYER1 = iconx;
    const PLAYER2 = iconO;
    
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1)
    const [square, setSquare] = useState(INITIAL_BOARD);

    function handleCurrentPlayer (){
        currentPlayer === PLAYER1 ? setCurrentPlayer(PLAYER2) : setCurrentPlayer(PLAYER1)
        return currentPlayer
    }

    function handleChoice (row, col){
        let mark = handleCurrentPlayer()
        let gameBoard = [...square.map(array => [...array])];
        gameBoard[row][col] = <img src={mark} alt="mark"/>;
        
        setSquare(gameBoard)
    }
    console.log(square)
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
        </>
    )
}