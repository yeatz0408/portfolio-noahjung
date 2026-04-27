import TypeBadge from '../atom/TypeBadge';
import type { PokemonInfo } from '../interface/pokemon';

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
          <div>
            {pokemonDetail?.types.map((type) => (
              <span className={'px-1'}>
                <TypeBadge typeEn={type.en} typeKr={type.kr} />
              </span>
            ))}
          </div>
          <div>{pokemonDetail?.entry}</div>
          <br />
          <div>
            <label>
              <b>Stats</b>
            </label>
            <div>
              <span>HP: </span> <span>{pokemonDetail?.stats.hp}</span>
              <span>Attack: </span> <span>{pokemonDetail?.stats.attack}</span>
              <span>Defense: </span> <span>{pokemonDetail?.stats.defense}</span>
              <span>Special-attack: </span>{' '}
              <span>{pokemonDetail?.stats.specialAttack}</span>
              <span>Special-defense: </span>{' '}
              <span>{pokemonDetail?.stats.specialDefense}</span>
              <span>Speed: </span> <span>{pokemonDetail?.stats.speed}</span>
            </div>
          </div>
          {pokemonDetail?.moves && (
            <div>
              <label>
                <b>기술</b>
              </label>
              <table>
                <tr>
                  <th>이름</th>
                  <th>타입</th>
                  <th>설명</th>
                </tr>
                {pokemonDetail?.moves.map((move) => (
                  <tr>
                    <td>{move.name}</td>
                    <td></td>
                    <td>{move.desc}</td>
                  </tr>
                ))}
              </table>
            </div>
          )}
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
export default PokemonDetailModal;
