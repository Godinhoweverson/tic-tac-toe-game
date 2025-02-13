import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './components/InitialGame/initialGame.css'
import './components/gameStart/gameStart.css'
import './components/boardGame/boardGame.css'
import './components/scoreGame/scoreGame.css'
import './components/winner/winner.css'

import { BrowserRouter } from "react-router";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
