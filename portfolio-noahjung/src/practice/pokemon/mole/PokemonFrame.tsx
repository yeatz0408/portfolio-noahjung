import type { PokemonInfo } from '../customHook/useGetPokemonPage';

const typeColors: Record<string, string> = {
  normal: 'bg-stone-400',
  fire: 'bg-orange-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-400',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-400',
  poison: 'bg-purple-400',
  ground: 'bg-amber-600',
  flying: 'bg-sky-400',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-indigo-500',
  dragon: 'bg-amber-500',
  fairy: 'bg-pink-200',
  steel: 'bg-cyan-200',
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
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ${typeColors[type]} rounded-full`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;
