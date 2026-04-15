import {useState, useEffect} from 'react';

export interface PokemonInfo {
  id: number;
  name: string;
  imgSrcFront: string;
  imgSrcBack: string;
  types: string[];
  moves?: string[];
}

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

function getUrlByPage(pageNum: number) {
  return POKEMON_API_URL + pageNum * 20;
}

const LETS_GO = 'lets-go-';
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=';

export default useGetPokemonPage;