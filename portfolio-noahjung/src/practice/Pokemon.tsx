import React, { useEffect, useState } from "react"

export type PokemonProp = {
    pokemonId: number
}

interface PokemonInfo {
    id: number;
    name: string;
    entry: string;
    types: string[];
    moves?: string[];
    evolutionChain?: string[];
    imgSrc?: string;
}

const Pokemon: React.FC<PokemonProp> = ({ pokemonId }) => {

    const [ pokemonInfo, setPokemonInfo ] = useState<PokemonInfo | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;
        getPokemon(pokemonId).then(data => {
            if (isMounted) setPokemonInfo(data);
        });
        return () => {
            isMounted = false;
        }
    }, [pokemonId]);

    console.log(pokemonInfo)

    return (
        <div>
            <h1>PokemonInfo</h1>
            <div className="pb-5">
                <label><b>Name</b></label><br />
                <label></label>
            </div>

            <div className="pb-5">
                <label><b>Types</b></label>
            </div>

            <div className="pb-5">
                <label><b>Moves</b></label>
                
            </div>
            <div className="flex">
            </div>
        </div>
    )
}

async function getPokemon(pokemonId: number): Promise<PokemonInfo> {
    try {

        const [ pokemonRes, entryRes, imgRes ] = await Promise.all([
            fetch(POKEMON_API_URL + pokemonId),
            fetch(POKEMON_ENTRY_KANTO_API_URL),
            fetch(POKEMON_IMG_API_URL + pokemonId)
        ])

        const [ pokemonData, entryData, imgData ] = await Promise.all([
            pokemonRes.json(),
            entryRes.json(),
            imgRes.json(),
        ])

        const speciesRes = await fetch(POKEMON_SPECIES_API_URL + pokemonData.id);
        const speciesData = await speciesRes.json();

        const evolutionRes = await fetch(speciesData.evolution_chain?.url);
        const evolutionData = await evolutionRes.json();

        const moves = pokemonData.moves
            .filter((move: {version_group_details: {version_group: {name: string}}[]}) => move.version_group_details.some(vgd => vgd.version_group.name.includes(LETS_GO)))
            .map((filteredMove: {move: {name: string}}) => filteredMove.move.name);

        let evolution : string[] = [evolutionData.chain?.species?.name];
        evolution = [...evolution, ...extractEvolution(evolutionData.chain.evolves_to)]

        const toReturn: PokemonInfo = {
            id: pokemonData.id,
            name: pokemonData.name,
            entry: entryData.pokemon_entries[pokemonId-1],
            types: pokemonData.types.map((type: {type: {name: string}}) => type.type.name),
            moves: moves,
            evolutionChain: evolution,
            imgSrc: imgData.sprites?.back_default
        }

        return toReturn;

    } catch (error) {
        console.log(error);
        return {
            id: -1,
            name: "error",
            entry: String(error),
            types: [],
        }
    }
}

type EvolvesTo = {
    evolvesTo?: EvolvesTo[];
    species: {
        name: string;
    };
}

function extractEvolution(evolvesTo: EvolvesTo[]) : string[] {
    const toReturn: string[] = [];
    if (evolvesTo[0]) {
        toReturn.push(evolvesTo[0].species.name);
    }
    
    if (evolvesTo[0].evolvesTo) {
        toReturn.push(evolvesTo[0].evolvesTo[0].species.name);
    }

    return toReturn;
}


const LETS_GO = "lets-go-"

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_EVOLUTION_API_URL = "https://pokeapi.co/api/v2/evolution-chain/";
const POKEMON_IMG_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKEMON_SPECIES_API_URL = "https://pokeapi.co/api/v2/pokemon-species/";
const POKEMON_ENTRY_KANTO_API_URL = "https://pokeapi.co/api/v2/pokedex/2";

export default Pokemon