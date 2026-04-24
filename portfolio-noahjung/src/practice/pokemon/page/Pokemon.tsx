import React, { useEffect, useState } from 'react';
import useGetPokemonPage from '../customHook/useGetPokemonPage';
import Loading from '../atom/Loading';
import PokemonFrame from '../mole/PokemonFrame';
import Paginator from '../mole/Paginator';
import useSearchPokemon from '../customHook/useSearchPokemon';
import type { PokemonInfo } from '../interface/pokemon';

const Pokemon: React.FC = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [isFront, setIsFront] = useState<boolean>(true);

  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [pokemonDetail, setPokemonDetail] = useState<PokemonInfo | undefined>(
    undefined
  );

  const [pageData, setPageData] = useState<PokemonInfo[]>([]);

  const { isFetching: isDefaultLoading, data: defaultData } =
    useGetPokemonPage(pageNum);
  const {
    isLoading: isSearchLoading,
    data: searchData,
    searchPokemon: searchPokemon,
  } = useSearchPokemon();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (!searchInput && defaultData) {
      setPageData(defaultData);
      setIsSearchResult(false);
      return;
    }

    if (searchInput.length >= 1 && searchInput.length <= 2) {
      alert('Please enter at least 3 characters.');
      return;
    }

    setIsSearchResult(true);
    searchPokemon(searchInput!);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickDetail = (pi: PokemonInfo) => {
    setPokemonDetail(pi);
    setShowDetail(true);
  };

  useEffect(() => {
    if (!defaultData) {
      return;
    }
    setPageData(defaultData);
  }, [defaultData]);

  useEffect(() => {
    if (searchData === undefined) {
      return;
    }
    setPageData(searchData);
  }, [searchData]);

  if (isDefaultLoading || isSearchLoading) {
    return <Loading />;
  }

  return (
    <div className="pb-20">
      <div className="pt-10">
        <h1 className="text-2xl font-bold mb-6">Pokemon Stadium</h1>
      </div>

      {/* Toolbar: Search and Toggle on the same line */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        {/* Toggle Button */}
        <button
          onClick={() => setIsFront(!isFront)}
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm bg-white"
        >
          {isFront ? 'Show back' : 'Show front'}
        </button>
        {/* Search Group */}
        <div className="flex shadow-sm">
          <input
            type="text"
            placeholder="Search Pokemon..."
            onChange={handleInput}
            value={searchInput}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-r-md hover:bg-slate-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {pageData &&
          pageData.map((pi) => (
            <div onClick={() => handleClickDetail(pi)}>
              <PokemonFrame
                key={`${pi.id}-${pi.name}`}
                pokemonInfo={pi}
                isFront={isFront}
              />
            </div>
          ))}
      </div>
      {!isSearchResult && (
        <div className="flex justify-center py-5">
          <Paginator pageNum={pageNum} setPageNum={setPageNum} />
        </div>
      )}
      <PokemonDetailModal
        showModal={showDetail}
        setShowModal={setShowDetail}
        pokemonDetail={pokemonDetail}
        setPokemonDetail={setPokemonDetail}
      />
    </div>
  );
};

interface PokemonDetailProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;

  pokemonDetail: PokemonInfo | undefined;
  setPokemonDetail: (pokemonInfo: PokemonInfo | undefined) => void;
}

const PokemonDetailModal: React.FC<PokemonDetailProps> = ({
  showModal,
  setShowModal,
  pokemonDetail,
  setPokemonDetail,
}) => {
  const handleClose = () => {
    setPokemonDetail(undefined);
    setShowModal(false);
  };

  if (!showModal) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="flex flex-col w-full max-w-2xl min-h-[450px] bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <h2>{pokemonDetail?.name}</h2>
        <div className="flex-grow p-6">
          <div>
            <img src={pokemonDetail?.imgSrcFront} />
          </div>
        </div>

        <div className="flex justify-end p-6 pt-0">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
