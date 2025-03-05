import { useState, useRef } from "react";
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

export default function BoardGame ({mark, gameSelect}){
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [square, setSquare] = useState(INITIAL_BOARD);
    const [result, setResult] = useState({});
    const [winner, setWinner] = useState(null);
    const [resetGame, setResetGame] = useState(false);
    const [nextRound, setNextRound] = useState(false);

    const timeOutRef = useRef();

    let PLAYER1 = Number(mark.mark);
  
    function handleCurrentPlayer (){ 
        setCurrentPlayer(prev => prev === 0 ? 1 : 0)
        return currentPlayer;
    }; 

    function handleChoice(row, col){
        setNextRound(false);
        setResetGame(false);

        let gameBoard = null;
   
        let current = handleCurrentPlayer();
        
        gameBoard = [...square.map(array => [...array])];
        if(!gameBoard[row][col]){
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
    }

    function handleAiPlayer(row, col) {
        setSquare((prevSquare) => {
            let gameBoard = [...prevSquare];
            gameBoard[row][col] = <img src={iconx} alt="mark" className="0" />; // Ensure className is a string
            return gameBoard;
        });
    
        // Ensure we check winner *after* updating state
        setSquare((prevSquare) => {
            const classNameValue = prevSquare[row][col]?.props?.className; // Access className safely
    
            if (prevSquare[row][col] !== null) {
                setResult((prevResult) => ({
                    ...prevResult,
                    [SETUP_DATA[row][col]]: classNameValue, // Store className value
                }));
            }
    
            setWinner(classNameValue); // Store winner
    
            return prevSquare; // Maintain state
        });
    
        if (gameSelect !== null) {
            timeOutRef.current = setTimeout(() => {
                setSquare((prevSquare) => {
                    let gameBoardCpu = [...prevSquare];
    
                    let rowCpu, colCpu;
                    do {
                        rowCpu = Math.floor(Math.random() * 3);
                        colCpu = Math.floor(Math.random() * 3);
                    } while (gameBoardCpu[rowCpu][colCpu] !== null);
    
                    gameBoardCpu[rowCpu][colCpu] = <img src={iconO} alt="mark" className="1" />;
                    return gameBoardCpu;
                });
            }, 2000);
        }
    }

    function stopSetTimeOut(){
        clearTimeout(timeOutRef.current)
    }

    function checkWinner(sequence){
        let resultMatch = null;
        resultMatch = RESULT_MATCH.some(match =>
              Object.keys(match).every(key=>match[key] === sequence[key])
          );

          let draw = null;
          draw = square.every(row => row.every(item => item !== null));

        if(resultMatch){
            stopSetTimeOut();
            return resultMatch;
        }else if(draw){
            stopSetTimeOut();
            return 2;
        };
    };
    console.log(result)
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
                            <div key={colIndex} className="cell-BoardGame" onClick={() => handleAiPlayer(rowIndex, colIndex)}>
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