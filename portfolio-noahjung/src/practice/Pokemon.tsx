import React, { useEffect, useRef, useState } from 'react';
import useGetPokemon from '../practice/useGetPokemon';
import useGetPokemonPage from '../practice/useGetPokemonPage';
import type { PokemonInfo } from '../practice/useGetPokemonPage';

export type PokemonProp = {
  pokemonId: number;
};

const Pokemon: React.FC<PokemonProp> = ({ pokemonId }) => {
  // const { isFetching, data } = useGetPokemon(pokemonId);

  const [isFront, setIsFront] = useState<boolean>(true);

  const { data } = useGetPokemonPage(1);

  return (
    <div>
      <div className="p-10 flex justify-between">
        <h1>PokemonInfo</h1>
        <button
          onClick={() => setIsFront(!isFront)}
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
        >
          {isFront ? 'Show back' : 'Show front'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {data &&
          data.map((pi) => <PokemonFrame pokemonInfo={pi} isFront={isFront} />)}
      </div>
    </div>
  );
};

const PokemonFrame = ({
  pokemonInfo,
  isFront,
}: {
  pokemonInfo: PokemonInfo;
  isFront: boolean;
}) => {
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full mb-3">
        <img
          src={isFront ? pokemonInfo.imgSrcFront : pokemonInfo.imgSrcBack}
          alt={pokemonInfo.name}
          className="w-full h-full object-contain"
        />
      </div>

      <label className="text-lg font-bold capitalize text-gray-800 mb-2">
        {`${pokemonInfo.id}. ${pokemonInfo.name}`}
      </label>

      <div className="flex gap-2 w-full justify-center">
        {pokemonInfo.types.map((type) => (
          <span
            key={`${pokemonInfo.id}-${type}`}
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-slate-400 rounded-full"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
