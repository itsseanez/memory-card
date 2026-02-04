import { useEffect, useState } from "react";
import styles from "../styles/PokemonCards.module.css";

export default function PokemonCards({ handleCardClick }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameBoard, setGameBoard] = useState([]);

  function shuffleArray(array) {
    const arr = [...array]; // copy to avoid mutating state
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function handleShuffle() {
    setGameBoard(shuffleArray(pokemonList).slice(0, 12));
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=107&offset=386",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon list");
        }

        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default, // front sprite
            };
          })
        );

        // 3️⃣ Store all detailed Pokémon in state
        setPokemonList(detailedPokemon);

        // 4️⃣ Pick the first game board (12 random Pokémon)
        setGameBoard(shuffleArray(detailedPokemon).slice(0, 12));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.cardGrid}>
      {gameBoard.map((pokemon) => (
        <button
          key={pokemon.name}
          className={styles.card}
          onClick={handleShuffle}
        >
            <img src={pokemon.image} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </button>
      ))}
    </div>
  );
}
