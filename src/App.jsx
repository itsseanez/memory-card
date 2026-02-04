import { useState } from 'react'
import './App.css'
import PokemonCards from './components/PokemonCards.jsx'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  function handleCardClick(cardName) {
    if (clickedCards.includes(cardName)) {
      // Card has been clicked before - reset score and clicked cards
      setScore(0);
      setClickedCards([]);
    } else {
      // New card clicked - increment score and add to clicked cards
      const newClickedCards = [...clickedCards, cardName];
      setClickedCards(newClickedCards);
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
  }

  return (
    <>
      <header>
        <h1>Pokémon<span className='auxColor'>(Gen 4)</span> Memory Game</h1>
        <div className='column'>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </header>
      <h2>Get points by clicking on an image but don't click on any more than once!</h2>
      <main>
          <PokemonCards handleCardClick={handleCardClick} />
      </main>
    </>
  )
}

export default App
