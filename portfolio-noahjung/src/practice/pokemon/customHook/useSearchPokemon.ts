import { useState, useRef } from 'react';
import type { PokemonInfo } from '../interface/pokemon';

const useSearchPokemon = () => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<PokemonInfo[] | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    const lastRequestId = useRef(0);

    const searchPokemon = async (pokemonName: string) => {
        const currentRequestId = ++lastRequestId.current;

        try {
            setIsLoading(true);

            console.log("executing Search API");
            const searchRes = await fetch(POKEMON_API_URL + pokemonName);
            const searchData = await searchRes.json();

            const types = searchData.types.map((type: { type: { name: string } }) => type.type.name);
            const moves = searchData.moves
                            .filter((move: {
                                version_group_details: { 
                                    version_group: { name: string } }[];}) => 
                                        move.version_group_details.some(
                                            (vgd) => vgd.version_group.name.includes(LETS_GO)))
                                            .map((filteredMove: { move: { name: string } }) => filteredMove.move.name);
            const pokemonInfo = {
                id: searchData.id,
                name: searchData.name,
                imgSrcFront: searchData.sprites.front_default,
                imgSrcBack: searchData.sprites.back_default,
                types: types,
                moves: moves,
            };

            if (currentRequestId !== lastRequestId.current) {
                return;
            }

            setData([pokemonInfo]);
        } catch (error) {
            if (currentRequestId === lastRequestId.current) {
                setData([]);    
            }
        } finally {
            if (currentRequestId === lastRequestId.current) {
                setIsLoading(false);
            }
        }
    }

    return {isLoading, data, error, searchPokemon};
}

const LETS_GO = 'lets-go-';
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export default useSearchPokemon;