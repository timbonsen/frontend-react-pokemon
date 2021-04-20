import axios from "axios";
import { useState, useEffect } from "react";
import "./Pokemon.css"

function Pokemon({ url }) {
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonInfo, setPokemonInfo] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: { name, weight, sprites, abilities, moves }} = await axios.get(url);
                setPokemonData({
                    name: name,
                    weight: weight,
                    image: sprites.other['official-artwork'].front_default,
                    abilities: abilities,
                    moves: moves.length
                });
            } catch (e) {
                console.error(e);
            }
        }
        if (pokemonData < 1) {fetchData()}
    }, [pokemonData]);

    console.log(pokemonData)

    useEffect(() => {
        setPokemonInfo(
            <>
                <div className="pokemonContainer">
                    <h2>{pokemonData.name}</h2>
                    <img className="pokemonImage" src={pokemonData.image} alt={pokemonData.name}/>
                    <h3>Moves: {pokemonData.moves}</h3>
                    <h3>Weight: {pokemonData.weight}</h3>
                    <h3>Abilities:</h3>
                    <ul className="abilities">
                        {pokemonData.abilities?.map((ability) => (
                            <li key={ability.ability.name}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }, [pokemonData])

    return pokemonInfo;
}

export default Pokemon;
