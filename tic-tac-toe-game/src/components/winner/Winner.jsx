import iconO from '../../assets/images/icon-o-yellow.svg';
import iconx from '../../assets/images/icon-x-blue.svg';
import { Link } from 'react-router-dom';

export default function Winner({winner, onClick, nextRound}){
    return(
        <div className="winner-container" style={nextRound ? { display: 'none' } : {}}>
            <div className="winner-sub-container">
                <p>{winner === 0 ? 'PLAYER 1 WINS!' : winner === 1 ? 'PLAYER 2 WINS!' : ''}</p>
                <div className='heading-winner'>
                    {winner !== 2 ? <img src={winner === 0 ? iconx : iconO} alt="winner" /> : ''}
                    <h1 style={{color: winner === 0 ? 'var(--light-blue)' : winner === 1 ? 'var(--light-yellow)' : 'var(--silver)'}}>{winner === 0 || winner === 1 ? 'TAKES THE ROUND' : 'ROUND TIED'}</h1>
                </div>
                <div className='btns-winner'>
                    <button className='btn-quit'>
                    <Link to= {`/`}>
                        QUIT
                    </Link>
                    </button>
                    <button className='btn-next-round' onClick={onClick}>NEXT ROUND</button>
                </div>      
            </div>
        </div>
    )
}