import React from "react"
import { useState, useEffect } from "react"

interface PokemonProps {
    id: number
}

interface PokemonData {
    id: number
    name: string
    types: string[]
    moves?: string[]
}

const Pokemon: React.FC<PokemonProps> = ({ id }) => {

    const [pokemonData, setPokemonData] = useState<PokemonData | undefined>(undefined)

    useEffect(() => {
        getPokemonData(id).then(setPokemonData)
    }, [id])

    useEffect(() => {
        console.log(pokemonData)
    }, [pokemonData])
    return (
        <div>
            {pokemonData && (<div>
                <h1>{pokemonData.name}</h1>
                <div className="mb-5">
                    <label><b>Type</b></label>
                    {pokemonData.types && pokemonData.types.map(
                        type => (
                            <p>{type}</p>
                        )
                    )}
                </div>
                <div>
                    <label><b>Moves</b></label>
                    {
                        pokemonData.moves && pokemonData.moves.map(move => (
                            <span>{move} </span> //Fixme: I want to put , in between except for the end. 
                        ))
                    }
                </div>
            </div>)}
        </div>
    )
}

async function getPokemonData(id: number): Promise<PokemonData> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()

    return {
        id: data.id,
        name: data.name,
        types: data.types.map((t: any) => t.type.name),
        moves: data.moves?.map((m: any) => m.move.name) ?? []
    }
}

export default Pokemon