import { Link, useLocation  } from 'react-router-dom';

import BoardGame from '../boardGame/BoardGame.jsx';

export default function GameStart(){
    const location = useLocation();
   
    const queryParams = new URLSearchParams(location.search)
    const mark = queryParams.get('mark')  || 'yes';

    return(
        <>
            <main className='container-GameStart'>
                <BoardGame mark={mark}/>
            </main>
        </>
       
    )
}