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

            const targetPokemon = nameList.filter((pn: string) => pn.includes(pokemonName));

            console.log("executing Search API");

            const batchSearch = await Promise.all(targetPokemon.map(tp => fetch(POKEMON_API_URL + tp)));
            const batchData = await Promise.all(batchSearch.map(s => s.json()));

            const batchInfo = batchData.map(pokemonData => {
                const types = pokemonData.types.map((type: { type: { name: string } }) => type.type.name);
                const moves = pokemonData.moves
                                .filter((move: {
                                    version_group_details: { 
                                        version_group: { name: string } }[];}) => 
                                            move.version_group_details.some(
                                                (vgd) => vgd.version_group.name.includes(LETS_GO)))
                                                .map((filteredMove: { move: { name: string } }) => filteredMove.move.name);
                return {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    imgSrcFront: pokemonData.sprites.front_default,
                    imgSrcBack: pokemonData.sprites.back_default,
                    types: types,
                    moves: moves,
                };
            })

            if (currentRequestId !== lastRequestId.current) {
                return;
            }

            setData(batchInfo);
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

    const clearData = () => setData(undefined);

    return {isLoading, data, clearData, error, searchPokemon};
}

const LETS_GO = 'lets-go-';
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const nameList = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina', 'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'mr-mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew'];

export default useSearchPokemon;