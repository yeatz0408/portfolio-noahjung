import {useState, useEffect} from 'react';
import type { PokemonInfo } from '../interface/pokemon';

export interface PokemonPageResult {
    isFetching: boolean;
    data: PokemonInfo[] | undefined;
    error: Error | undefined;
}

const useGetPokemonPage = (pageNum: number) : PokemonPageResult => {

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [pokemonPageInfo, setPokemonPageInfo] = useState<PokemonInfo[] | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        let isCurrent = true;

        setPokemonPageInfo(undefined);
        setIsFetching(true);
        setError(undefined);

        const getPokemonPage = async () => {
            try {
                console.log("★ Calling API ★");

                const pageRes = await fetch(getUrlByPage(pageNum));
                const pageData = await pageRes.json();

                const urls: string[] = pageData.results.map((p: { url: string }) => p.url);

                const detailRes = await Promise.all(urls.map((url) => fetch(url)));
                const detailData = await Promise.all(detailRes.map((p) => p.json()));

                const pokemonInfos: PokemonInfo[] = detailData.map((pokemonData) => {
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
                if (isCurrent) {
                    setPokemonPageInfo(pokemonInfos);
                    setIsFetching(false);
                }
            } catch (error) {
                if (isCurrent) {
                    setError(error as Error);
                    setIsFetching(false);
                }
            } 
        }
        getPokemonPage();

        return () => {isCurrent = false; };
    }, [pageNum])

    return {isFetching: isFetching, data: pokemonPageInfo, error: error} 
}

function getIdsByPage(pageNum: number): number[] {
  const toReturn: number[] = [];

  let offset = 0;
  let limit = 20;

  if (pageNum !== 1) {
    offset = (pageNum - 1) * 20;
  }
  if (pageNum === 8) {
    limit = 11;
  }

  limit += offset
  while (offset < limit) {
    toReturn.push(offset++);
  }

  return toReturn;

}

function getUrlByPage(pageNum: number) {
    let offset = 0;
    let limit = 20;
    if (pageNum !== 1) {
        offset = (pageNum - 1) * 20;
    }
    if (pageNum === 8) {
        limit = 11;
    }
    const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return POKEMON_API_URL;
}

// FIXME: Test code. 
async function getPokemonPageBatch(ids: number[]) {
  const query = `
    query getBatch($ids: [Int!]) {
      pokemon_v2_pokemon(where: {id: {_in: $ids}}) {
        id
        name
        # Pokedex Entry
        pokemon_v2_pokemonspecy {
          pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
            flavor_text
          }
        }
        # Stats
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
        # Types
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        # Moves filtered for Let's Go Eevee (version_group_id: 19)
        pokemon_v2_pokemonmoves(where: {version_group_id: {_eq: 19}}) {
          pokemon_v2_move {
            name
            power
            pokemon_v2_type {
              name
            }
            pokemon_v2_movedamageclass {
              name
            }
          }
        }
        # Images
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  `;

  try {
    const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: { ids: ids },
      }),
    });

    return [];
  } catch (error) {
    console.error("Network Error:", error);
    return [];
  }
}

async function fetchBatchMoves(moveIds: number[]) {
  

  const query = `
    query getBatch($ids: [Int!]) {
      pokemon_v2_pokemon(where: {id: {_in: $ids}}) {
        id
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonmoves(limit: 5) {
          pokemon_v2_move {
            name
          }
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  `;

  try {
    const response = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: { ids: moveIds },
      }),
    });

    const result = await response.json();
    return result.data.pokemon_v2_move;
  } catch (error) {
    console.error("Error fetching moves:", error);
    return [];
  }
};


const LETS_GO = 'lets-go-';
const GQL_ENDPOINT = "https://beta.pokeapi.co/graphql/v1beta";

export default useGetPokemonPage;