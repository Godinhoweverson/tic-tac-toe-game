import { useState } from "react";

//COMPONENTS
import Winner from "../winner/Winner.jsx";
import ScoreGame from '../scoreGame/ScoreGame.jsx';

//DATA
import RESULT_MATCH from '../../data.js';

// ICONS
import iconO from '../../assets/images/icon-o-yellow.svg';
import iconx from '../../assets/images/icon-x-blue.svg';
import logo from '../../assets/images/logo.svg';
import iconXSilver from '../../assets/images/icon-x-silver.svg';
import iconOSilver from '../../assets/images/icon-o-silver.svg';
import iconRestart from '../../assets/images/icon-restart.svg';

export default function BoardGame ({mark}){
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
        currentPlayer === PLAYER1 ? setCurrentPlayer(PLAYER2) : setCurrentPlayer(PLAYER1);
        return currentPlayer;
    };
    
    function handleChoice (row, col){

        let gameBoard = [...square.map(array => [...array])];

        if(!gameBoard[row][col]){
            let current = handleCurrentPlayer();
            gameBoard[row][col] = <img src={current === 0 ? iconx : iconO} alt="mark" className={current}/> 
        }

        setSquare(gameBoard)

        if(gameBoard[row][col] !== null){
            setResult((prevResult) => ({
             ...prevResult,
              [SETUP_DATA[row][col]] : gameBoard[row][col].props.className,
          }));
        };
        setWinner(gameBoard[row][col].props.className);
    };


    function checkWinner(sequence){

        const resultMatch = RESULT_MATCH.some(match =>
              Object.keys(match).every(key=>match[key] === sequence[key])
          );

          let draw = square.every(row => row.every(item => item !== null));

        if(resultMatch){
            return resultMatch;
        }else if(draw){
            return 2;
        };
    };

    const winnerResult = checkWinner(result);

    return(
        <>
             <section className='turn-GameStart'>
                    <div className='icons-GameStart'>
                        <img src={logo} alt="Logo" />
                    </div>
                    <button className='btn-turn-GameStart'>
                        <img src={currentPlayer === 0 ? iconXSilver : iconOSilver } alt="current player"/> TURN
                    </button>
                    <button className='resetGame-GameStart'>
                        <img src={iconRestart} alt='Restart game'/>
                    </button>  
            </section>
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
             <ScoreGame winner={winnerResult && winnerResult !== 2 ? winner : winnerResult === 2 ? 2 : null}/>
            {winnerResult !== 2 && winnerResult ?
                                 <Winner winner={winner}/> : winnerResult === 2 ? <Winner winner={2}/> : null}
        </>
    )
}