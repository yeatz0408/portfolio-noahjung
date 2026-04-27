import TypeBadge from '../atom/TypeBadge';
import type { PokemonInfo } from '../interface/pokemon';

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
          <TypeBadge typeEn={type.en} typeKr={type.kr} />
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;
