import InitialGame from './components/InitialGame/InitialGame.jsx'
import GameStart from './components/gameStart/GameStart.jsx'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>
     <Routes>
      <Route path='/' Component={InitialGame}></Route>
      <Route path='/gameStart' Component={GameStart}></Route>
     </Routes>

      {/* There are 2 components inside intialGame PickMark and NewGameBtn */}
    </>
  )
}

export default App
