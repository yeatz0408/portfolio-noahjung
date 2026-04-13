import React, { useEffect, useState } from 'react';
import useGetPokemon from '../practice/useGetPokemon';

export type PokemonProp = {
  pokemonId: number;
};

const Pokemon: React.FC<PokemonProp> = ({ pokemonId }) => {
  const { isFetching, data } = useGetPokemon(pokemonId);

  console.log(isFetching, data);

  return (
    <div>
      <h1>PokemonInfo</h1>
      <div className="pb-5">
        <label>
          <b>Name</b>
        </label>
        <br />
        <label></label>
      </div>

      <div className="pb-5">
        <label>
          <b>Types</b>
        </label>
      </div>

      <div className="pb-5">
        <label>
          <b>Moves</b>
        </label>
      </div>
      <div className="flex"></div>
    </div>
  );
};

export default Pokemon;
