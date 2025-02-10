import { Link, useLocation  } from 'react-router-dom';

import BoardGame from '../boardGame/BoardGame.jsx';
import ScoreGame from '../scoreGame/ScoreGame.jsx';

import logo from '../../assets/images/logo.svg';
import iconXSilver from '../../assets/images/icon-x-silver.svg';
import iconRestart from '../../assets/images/icon-restart.svg';



export default function GameStart(){
    const location = useLocation();
   
    const queryParams = new URLSearchParams(location.search)
    const mark = queryParams.get('mark')  || 'yes';

    return(
        <>
            <main className='container-GameStart'>
                <section className='turn-GameStart'>
                    <div className='icons-GameStart'>
                        <img src={logo} alt="Logo" />
                    </div>
                    <button className='btn-turn-GameStart'>
                        <img src={iconXSilver} alt=""/> TURN
                    </button>
                    <button className='resetGame-GameStart'>
                        <img src={iconRestart} alt='Restart game'/>
                    </button>  
                </section>
                <BoardGame mark={mark}/>
                <footer className='container-score'>
                    <ScoreGame player={"X (YOU)"} points={'0'} color={'#31C3BD'}/>
                    <ScoreGame player={"Ties"} points={'0'} color={'#A8BFC9'}/>
                    <ScoreGame player={"O (CPU)"} points={'0'} color={'#F2B137'}/>
                </footer>
            </main>
        </>
       
    )
}