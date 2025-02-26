import logo from '../../assets/images/logo.svg';
import iconx from '../../assets/images/icon-x-navy.svg';
import iconXSilver from '../../assets/images/icon-x-silver.svg';
import iconO from '../../assets/images/icon-o.svg';
import iconOSilver from '../../assets/images/icon-o-silver.svg';

import { useState} from 'react';
import { Link } from 'react-router-dom';

export default function InitialGame(){

const [pickMarkX, setPickMarkX] = useState('active-initialGame');
const [pickMarkO, setPickMarkO] = useState('desactive-intialGame');

function handleClickXmark(){
    setPickMarkX('active-initialGame');
    setPickMarkO('desactive-intialGame')
}

function handleClickOmark(){
    setPickMarkO('active-initialGame')
    setPickMarkX('desactive-intialGame');
}
let mark = pickMarkX === 'active-initialGame' ? 0 : 1;
    return(
        <div className="box-initialGame">
            <nav className="nav-initialGame">
                <img src={logo} alt="Logo"/>
            </nav>
            <section className='box-pick-mark-initialGame'>
                <p>PICK PLAYER 1’S MARK</p>
                <div className='pick-mark-initialGame'>
                    <button className={`btn-pick-initialGame-x ${pickMarkX}`}
                    onClick={handleClickXmark}>
                        <img src={pickMarkX === 'active-initialGame'? iconx : iconXSilver} alt="mark x"/>
                    </button>
                    <button className={`btn-pick-initialGame-o ${pickMarkO}`}
                    onClick={handleClickOmark}>
                        <img src={pickMarkO === 'active-initialGame'? iconO : iconOSilver} alt=""/>
                    </button>
                </div>
                <p>REMEMBER : X GOES FIRST</p>
            </section>
            <div className="newGame-initalGame">
                <button className='cpu'>
                    <Link to= {`/gameStart?markCpu=${mark}`}>
                        NEW GAME (VS CPU)
                    </Link>
                </button>
                <button className='player'>
                    <Link to={`/gameStart?markMultiPlayer=${mark}`}>
                    NEW GAME  (VS PLAYER)
                    </Link>
                </button>
            </div>
        </div>
    )
}