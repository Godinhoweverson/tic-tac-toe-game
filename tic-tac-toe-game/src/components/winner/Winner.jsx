import iconO from '../../assets/images/icon-o-yellow.svg';
import iconx from '../../assets/images/icon-x-blue.svg';

export default function Winner({winner, onClick, resetGame}){
    return(
        <div className="winner-container" style={resetGame ? { display: 'none' } : {}}>
            <div className="winner-sub-container">
                <p>{winner === 0 ? 'PLAYER 1 WINS!' : winner === 1 ? 'PLAYER 2 WINS!' : ''}</p>
                <div className='heading-winner'>
                    {winner !== 2 ? <img src={winner === 0 ? iconx : iconO} alt="winner" /> : ''}
                    <h1 style={{color: winner === 0 ? 'var(--light-blue)' : 'var(--light-yellow)'}}>{winner === 0 || winner === 1 ? 'TAKES THE ROUND' : ''}</h1>
                </div>
                <div className='btns-winner'>
                    <button className='btn-quit'>Quit</button>
                    <button className='btn-next-round' onClick={onClick}>NEXT ROUND</button>
                </div>      
            </div>
        </div>
    )
}