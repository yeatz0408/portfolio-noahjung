import React, { useState } from 'react';
import useGetPokemonPage from '../customHook/useGetPokemonPage';
import Loading from '../atom/Loading';
import PokemonFrame from '../mole/PokemonFrame';
import Paginator from '../mole/Paginator';

const Pokemon: React.FC = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [isFront, setIsFront] = useState<boolean>(true);
  const { isFetching, data } = useGetPokemonPage(pageNum);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="pb-20">
      <div className="p-10 flex justify-between">
        <h1>Pokemon Stadium</h1>
        <button
          onClick={() => setIsFront(!isFront)}
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
        >
          {isFront ? 'Show back' : 'Show front'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {data &&
          data.map((pi) => (
            <PokemonFrame
              key={`${pi.id}-${pi.name}`}
              pokemonInfo={pi}
              isFront={isFront}
            />
          ))}
      </div>
      <div className="flex justify-center py-5">
        <Paginator pageNum={pageNum} setPageNum={setPageNum} />
      </div>
    </div>
  );
};

export default Pokemon;
