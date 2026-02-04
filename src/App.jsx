import { useState } from 'react'
import './App.css'
import PokemonCards from './components/PokemonCards.jsx'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <header>
        <h1>Pokémon(Gen 4) Memory Game</h1>
        <div className='column'>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      <h2>Get points by clicking on an image but don't click on any more than once!</h2>
      <main>
          <PokemonCards handleCardClick={() => {}} />
      </main>
    </>
  )
}

export default App
