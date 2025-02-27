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

export default function BoardGame (mark, gameSelect){
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [square, setSquare] = useState(INITIAL_BOARD);
    const [row, setRow] = useState();
    const [col, setCol] = useState();
    const [result, setResult] = useState({});
    const [winner, setWinner] = useState(null);
    const [resetGame, setResetGame] = useState(false);
    const [nextRound, setNextRound] = useState(false);

    let PLAYER1 = Number(mark.mark);
    // let PLAYER2 = PLAYER1 === 0 ? 1 : 0;
   console.log(gameSelect)
    function handleCurrentPlayer (){ 
        currentPlayer === 0 ? setCurrentPlayer(1) : setCurrentPlayer(0);
        return currentPlayer;
    };

    function handleCpuChoice(){
        setRow(Math.random() * 2);
        setCol(Math.random() * 2);

        console.log(row, col)
        return row, col
    }
    
    function handleChoice (row, col){
        setNextRound(false);
        setResetGame(false);
        let gameBoard = null;
        gameBoard = [...square.map(array => [...array])];
        if(!gameBoard[row][col]){
            let current = handleCurrentPlayer(mark);
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
        let resultMatch = null;
        resultMatch = RESULT_MATCH.some(match =>
              Object.keys(match).every(key=>match[key] === sequence[key])
          );

          let draw = null;
          draw = square.every(row => row.every(item => item !== null));

        if(resultMatch){
            return resultMatch;
        }else if(draw){
            return 2;
        };
    };
    
    let winnerResult = null;
    winnerResult = checkWinner(result);

    function handleNextRound(){
        setNextRound(true);
        setSquare(INITIAL_BOARD);
        setCurrentPlayer(0);
        setResult({});
        setWinner(null);
    }

    function handleRestartGame(){
        setResetGame(true);
        setSquare(INITIAL_BOARD);
        setCurrentPlayer(0);
        setResult({});
        setWinner(null);
    }

    return(
        <>
             <section className='turn-GameStart'>
                    <div className='icons-GameStart'>
                        <img src={logo} alt="Logo" />
                    </div>
                    <button className='btn-turn-GameStart'>
                        <img src={currentPlayer === 0 ? iconXSilver : iconOSilver } alt="current player"/> TURN
                    </button>
                    <button className='resetGame-GameStart' onClick={handleRestartGame}>
                        <img src={iconRestart} alt='Restart game'/>
                    </button>  
            </section>
            <section className="boardgame-BoardGame">
                {INITIAL_BOARD.map((row, rowIndex) =>(
                    <div key={rowIndex} className="row-BoardGame">
                        {row.map((col, colIndex) =>(
                            <div key={colIndex} className="cell-BoardGame" onClick={() => 
                                handleChoice(rowIndex, colIndex)}>
                            {/* <div key={colIndex} className="cell-BoardGame" onClick={() => handleChoice(0, 2)}> */}
                                {square[rowIndex][colIndex]}
                            </div>
                        ))}
                    </div>
                ))}                          
            </section>
             <ScoreGame winner={winnerResult && winnerResult !== 2 ? winner : winnerResult === 2 ? 2 : null} resetGame={resetGame}/>
            {winnerResult !== 2 && winnerResult ?
                                 <Winner winner={winner} onClick={handleNextRound} nextRound={nextRound} playerChoice={PLAYER1}/> :
                                  winnerResult === 2 ?
                                 <Winner winner={2} onClick={handleNextRound} nextRound={nextRound} playerChoice={PLAYER1}/> : null}
        </>
    )
}