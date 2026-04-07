import React, { useEffect, useState } from "react"

export type PokemonProp = {
    pokemonId: number
}

interface PokemonInfo {
    id: number
    name: string
    types: string[]
    moves: string[]
}

const Pokemon: React.FC<PokemonProp> = ({ pokemonId }) => {

    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(undefined)

    useEffect(() => {
        if (!pokemonId) return
        getPokemon(pokemonId).then(setPokemonInfo)
    }, [pokemonId])

    useEffect(() => {
        console.log(pokemonInfo)
    }, [pokemonInfo])

    return (
        <div>
            <h1>PokemonInfo</h1>
            <div className="pb-5">
                <label><b>Name</b></label><br />
                <label>{pokemonInfo?.name}</label>
            </div>

            <div className="pb-5">
                <label><b>Type{pokemonInfo && pokemonInfo.types.length > 1 && <span>s</span>}</b></label>
                {pokemonInfo?.types.map((type, idx) => (<div key={`${idx}-${type}`}>{type}</div>))}
            </div>

            <div className="pb-5">
                <label><b>Moves</b></label>
                {pokemonInfo?.moves.map((m, i) => (
                    <div key={`${i}-${m}`}>
                        {m}
                    </div>
                ))}
            </div>
        </div>
    )
}

async function getPokemon(pokemonId: number): Promise<PokemonInfo> {
    try {
        const evolutionResponse = await fetch(POKEMON_EVOLUTION_API_URL + 1).then(response => response.json())
        console.log(evolutionResponse)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/ivysaur`)
        const pokemonData = await response.json()
        console.log(pokemonData)

        const moves = pokemonData.moves.
            filter((move: { version_group_details: { version_group: { name: string } }[] }) => move.version_group_details
                .some((vgd: { version_group: { name: string } }) => vgd.version_group.name.includes(LETS_GO)))
            .map((filteredMove: { move: { name: string } }) => filteredMove.move.name)


        return {
            id: pokemonId,
            name: pokemonData.name,
            types: pokemonData.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
            moves: moves
        }
    } catch (error) {
        console.log(error)
        return { id: -1, name: "error", types: [], moves: [] }
    }
}

const LETS_GO = "lets-go-"

const POKEMON_ENCOUNTER_API_URL = "https://pokeapi.co/api/v2/encounter-method/"

//https://pokeapi.co/api/v2/evolution-chain/{id}/
const POKEMON_EVOLUTION_API_URL = "https://pokeapi.co/api/v2/evolution-chain/"

export default Pokemon