interface TypeBadgeProps {
  typeEn: string;
  typeKr: string;
}

const TypeBadge = ({ typeEn, typeKr }: TypeBadgeProps) => {
  return (
    <>
      <span
        className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white ${typeColors[typeEn]} rounded-full`}
      >
        {typeKr}
      </span>
    </>
  );
};

const typeColors: Record<string, string> = {
  Normal: 'bg-stone-400',
  Fire: 'bg-orange-400',
  Water: 'bg-blue-400',
  Grass: 'bg-green-400',
  Electric: 'bg-yellow-400',
  Ice: 'bg-cyan-400',
  Fighting: 'bg-red-400',
  Poison: 'bg-purple-400',
  Ground: 'bg-amber-600',
  Flying: 'bg-sky-400',
  Psychic: 'bg-pink-400',
  Bug: 'bg-lime-500',
  Rock: 'bg-yellow-700',
  Ghost: 'bg-indigo-500',
  Dragon: 'bg-amber-500',
  Fairy: 'bg-pink-200',
  Steel: 'bg-cyan-200',
};

export default TypeBadge;
