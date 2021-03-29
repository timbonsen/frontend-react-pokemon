import axios from "axios";
import { useState, useEffect } from "react";

function Pokemon() {
    const [pokemonData, setPokemonData] = useState([])
    const [pokemonInfo, setPokemonInfo] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: { name, weight, sprites: {front_default}}} = await axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`);
                setPokemonData({
                    name: name,
                    weight: weight,
                    image: front_default,
                });
                console.log(name + weight)
            } catch (e) {
                console.error(e);
            }
        }
        if (pokemonData < 1) {fetchData()}
    }, [pokemonData])


    useEffect(() => {
        setPokemonInfo(
            <>
                <div className="pokemonContainer">
                    <h2>{pokemonData.name}</h2>
                    <img src={pokemonData.image} alt={pokemonData.name}/>
                </div>
            </>
        )
    }, [pokemonData])

    return pokemonInfo;
}

export default Pokemon;
