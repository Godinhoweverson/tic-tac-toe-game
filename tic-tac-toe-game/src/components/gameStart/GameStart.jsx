import { Link, useLocation  } from 'react-router-dom';

import BoardGame from '../boardGame/BoardGame.jsx';

export default function GameStart(){
    const location = useLocation();
   
    const queryParams = new URLSearchParams(location.search)
    const markCpu = queryParams.get('markCpu')  || null;
    const markMultiPlayer = queryParams.get('markMultiPlayer')  || null;
    
    return(
        <>
            <main className='container-GameStart'>
                <BoardGame mark={markCpu ? markCpu : markMultiPlayer} gameSelect={markCpu ? 'cpu' : 'MultiPlayer'}/>
            </main>
        </>
       
    )
}