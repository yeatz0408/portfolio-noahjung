import React, { useEffect, useState } from 'react';
import useGetPokemonPage from '../practice/useGetPokemonPage';
import type { PokemonInfo } from '../practice/useGetPokemonPage';

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

const Loading = () => (
  <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
    <style>{`@keyframes s {to{transform:rotate(360deg)}}`}</style>
    <div
      style={{
        width: '60px',
        height: '60px',
        border: '6px solid #eee',
        borderTopColor: '#007bff',
        borderRadius: '50%',
        animation: 's .8s infinite linear',
      }}
    />
  </div>
);

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

interface PaginatorProps {
  pageNum: number;
  setPageNum: (num: number) => void;
}

const Paginator = ({ pageNum, setPageNum }: PaginatorProps) => {
  const MIN = 1;
  const MAX = 8;

  const [pageNums, setPageNums] = useState<number[]>([]);
  const [hasMoveToFirstButton, setHasMoveToFirstButton] =
    useState<boolean>(false);
  const [hasMoveToLastButton, setHasMoveToLastButton] =
    useState<boolean>(false);

  if (pageNum < MIN || pageNum > MAX) {
    throw new Error(`Please choose page number between ${MIN} and ${MAX}`);
  }

  useEffect(() => {
    setPageNums([]);
    if (pageNum === MIN || pageNum === MIN + 1) {
      setPageNums([MIN, MIN + 1, MIN + 2]);
      setHasMoveToFirstButton(false);
      setHasMoveToLastButton(true);
    } else if (pageNum === MAX || pageNum === MAX - 1) {
      setPageNums([MAX - 2, MAX - 1, MAX]);
      setHasMoveToFirstButton(true);
      setHasMoveToLastButton(false);
    } else {
      setPageNums([pageNum - 1, pageNum, pageNum + 1]);
      setHasMoveToFirstButton(true);
      setHasMoveToLastButton(true);
    }
  }, [pageNum]);

  return (
    <>
      <div className="flex gap-4">
        {hasMoveToFirstButton && (
          <button
            className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm"
            onClick={() => setPageNum(MIN)}
          >
            {'<<'}
          </button>
        )}
        {pageNums.map((num) => (
          <button
            key={`pageNum-${num}`}
            className={`px-3 py-1 border border-gray-300 ${
              num === pageNum ? 'bg-blue-500 text-white' : 'bg-white'
            } ${num !== pageNum && 'hover:bg-gray-100'} text-sm`}
            onClick={() => setPageNum(num)}
            disabled={num === pageNum}
          >
            {num}
          </button>
        ))}
        {hasMoveToLastButton && (
          <button
            className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm"
            onClick={() => setPageNum(MAX)}
          >
            {'>>'}
          </button>
        )}
      </div>
    </>
  );
};

export default Pokemon;
