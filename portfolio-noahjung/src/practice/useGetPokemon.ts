import { useState, useEffect, useMemo } from 'react';

export interface PokemonResult {
  isFetching: boolean;
  data: PokemonInfo | undefined;
  error?: Error | undefined;
}

export interface PokemonInfo {
  id: number;
  name: string;
  types: string[];
  moves?: string[];
  evolutionChain?: string[];
  imgSrc?: string;
}

const useGetPokemon = (pokemonId: number): PokemonResult => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [data, setData] = useState<PokemonInfo | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {

    let isMounted = true;

    setIsFetching(true);
    setData(undefined);
    setError(undefined);

    const fetchPokemon = async () => {
      try {
        const pokemonInfo = await getPokemon(pokemonId);
        if (isMounted) {
          setData(pokemonInfo);
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error);
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    }
    fetchPokemon();

    return () => { isMounted = false; } ;
  }, [pokemonId]);

  return useMemo(() => {
    return {isFetching, data, error};
  }, [isFetching, data, error])
}

async function getPokemon(pokemonId: number): Promise<PokemonInfo> {
  const [pokemonRes, imgRes] = await Promise.all([
    fetch(POKEMON_API_URL + pokemonId),
    fetch(POKEMON_IMG_API_URL + pokemonId),
  ]);

  if (!pokemonRes.ok || !imgRes.ok) {
    throw new Error("API failed. ");
  }

  const [pokemonData, imgData] = await Promise.all([
    pokemonRes.json(),
    imgRes.json()
  ])

  const speciesRes = await fetch(POKEMON_SPECIES_API_URL + pokemonData.id);
  if (!speciesRes.ok) {
    throw new Error("API failed. ");
  }

  const speciesData = await speciesRes.json();

  const evolutionRes = await fetch(speciesData.evolution_chain?.url);
  if (!evolutionRes.ok) {
    throw new Error("API failed. ");
  }

  const evolutionData = await evolutionRes.json();

  const moves = pokemonData.moves
    .filter(
      (move: {
        version_group_details: { version_group: { name: string } }[];
      }) =>
        move.version_group_details.some((vgd) =>
          vgd.version_group.name.includes(LETS_GO)
        )
    )
    .map((filteredMove: { move: { name: string } }) => filteredMove.move.name);

  let evolution: string[] = [evolutionData.chain?.species?.name];
  evolution = [
    ...evolution,
    ...extractEvolution(evolutionData.chain.evolves_to),
  ];

  const toReturn: PokemonInfo = {
    id: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map(
      (type: { type: { name: string } }) => type.type.name
    ),
    moves: moves,
    evolutionChain: evolution,
    imgSrc: imgData.sprites?.back_default,
  };

  return toReturn;
}

type EvolvesTo = {
  evolvesTo?: EvolvesTo[];
  species: {
    name: string;
  };
};

function extractEvolution(evolvesTo: EvolvesTo[]): string[] {
  const toReturn: string[] = [];
  if (evolvesTo[0]) {
    toReturn.push(evolvesTo[0].species.name);
  }

  if (evolvesTo[0].evolvesTo) {
    toReturn.push(evolvesTo[0].evolvesTo[0].species.name);
  }

  return toReturn;
}

const LETS_GO = 'lets-go-';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_EVOLUTION_API_URL = 'https://pokeapi.co/api/v2/evolution-chain/';
const POKEMON_IMG_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';
const POKEMON_ENTRY_KANTO_API_URL = 'https://pokeapi.co/api/v2/pokedex/2';

export default useGetPokemon;