import {useState, useEffect} from 'react';
import type { PokeApiPokemon, PokemonInfo, StatInfo, TypeInfo } from '../interface/pokemon';

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

                const data: PokeApiPokemon[] = await getPokemonPageBatch(getIdsByPage(pageNum));
                const pokemonInfos: PokemonInfo[] = data.map((pokemonData) => {
                  const types: TypeInfo[] = pokemonData.pokemon_v2_pokemontypes.map((type) => {return {
                    en: type.pokemon_v2_type.pokemon_v2_typenames[1].name, 
                    kr: type.pokemon_v2_type.pokemon_v2_typenames[0].name
                  }});
                  const moves = pokemonData.pokemon_v2_pokemonmoves.map((move) => {
                    return {
                      id: move.pokemon_v2_move.id,
                      name: move.pokemon_v2_move.name,
                      class: move.pokemon_v2_move.pokemon_v2_movedamageclass.name,
                      type: move.pokemon_v2_move.pokemon_v2_type.name,
                      power: move.pokemon_v2_move.power,
                      desc: move.pokemon_v2_move.pokemon_v2_moveflavortexts.flavor_text
                    }
                  });

                  const statMap: Record<string, number> = {};
                  pokemonData.pokemon_v2_pokemonstats.forEach((s) => {
                    statMap[s.pokemon_v2_stat.name] = s.base_stat;
                  });
                  const stats: StatInfo = {
                    hp: statMap["hp"] || 0,
                    attack: statMap["attack"] || 0,
                    defense: statMap["defense"] || 0,
                    specialAttack: statMap["special-attack"] || 0,
                    specialDefense: statMap["special-defense"] || 0,
                    speed: statMap["speed"] || 0,
                  }

                  return {
                    id: pokemonData.id,
                    name: pokemonData.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].name,
                    entry: pokemonData.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text,
                    imgSrcFront: pokemonData.pokemon_v2_pokemonsprites[0].sprites.front_default,
                    imgSrcBack: pokemonData.pokemon_v2_pokemonsprites[0].sprites.back_default,
                    types: types,
                    stats: stats,
                    moves: moves,
                  }
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

  let offset = 1;
  let limit = 20;

  if (pageNum !== 1) {
    offset = (pageNum - 1) * 20 + 1;
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

async function getPokemonPageBatch(ids: number[]): Promise<PokeApiPokemon[]> {
  const query = `
    query getBatch($ids: [Int!]) {
    pokemon_v2_pokemon(where: {id: {_in: $ids}}) {
      id
      name
      # Pokedex Entry - Changed language_id to 3 for Korean
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 3}}, limit: 1) {
          flavor_text
        }
        # Adding Korean Names for the Species
        pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 3}}) {
          name
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
          # Adding Korean Names for Types
          pokemon_v2_typenames(where: {language_id: {_in: [3, 9]}}) {
            name
          }
        }
      }
      # Moves
      pokemon_v2_pokemonmoves(where: {version_group_id: {_eq: 19}}) {
        pokemon_v2_move {
          id
          # Adding Korean Names for Moves
          pokemon_v2_movenames(where: {language_id: {_eq: 3}}) {
            name
          }
          power
          pokemon_v2_type {
            pokemon_v2_typenames(where: {language_id: {_eq: 3}}) {
              name
            }
          }
          pokemon_v2_movedamageclass {
            # Adding Korean Names for Damage Class (Physical/Special)
            pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 3}}) {
              name
            }
          }
          # Move Flavor Text - Changed language_id to 3
          pokemon_v2_moveflavortexts(where: {language_id: {_eq: 3}}, limit: 1) {
            flavor_text
          }
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
        variables: { ids: ids },
      }),
    });
    
    const data = await response.json();

    return data.data.pokemon_v2_pokemon;
  } catch (error) {
    console.error("Network Error:", error);
    return [];
  }
}

const GQL_ENDPOINT = "https://beta.pokeapi.co/graphql/v1beta";

export default useGetPokemonPage;