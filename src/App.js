import React, { useState, useEffect } from 'react';
import './App.css';
import Pokemon from "./component/pokemon/Pokemon";
import axios from "axios";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState('');
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')


    async function fetchData() {
        try {
            const { data: { results, next, previous }} = await axios.get(url)
            setPokemon({
                results: results,
                previous: previous,
                next: next
            })
        } catch (e) {
            console.error(e)
            setError("Geen Pokemon gevonden, probeer het later nog een keer!")
        }
    }
    useEffect(() => {
        url && fetchData()
    }, [url])

  return (
      <div className="pageBackground">
          <div className="buttonContainer">
              <button
                  type="button"
                  disabled={!pokemon.previous}
                  onClick={() => setUrl(pokemon?.previous)}
              >
                  Vorige
              </button>
              <button
                  type="button"
                  disabled={!pokemon.next}
                  onClick={() => setUrl(pokemon?.next)}
                  >
                  Volgende
              </button>
          </div>
          <div className="cardsContainer">
              {pokemon.results &&
              pokemon.results.map((pokemon) => {
                  return <Pokemon url={pokemon.url} key={pokemon.name} />;
              })}
          </div>
          <div className="errorMessage">
              {error}
          </div>
      </div>

  );
}

export default App;
