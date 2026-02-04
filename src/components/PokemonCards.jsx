import { useEffect, useState } from "react";

export default function PokemonCards({ handleCardClick }) {
    const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=107&offset=386"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setPokemonList(data.results);
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
    <div className="card-grid">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.name}
          className="card"
          onClick={() => handleCardClick(pokemon)}
        >
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}