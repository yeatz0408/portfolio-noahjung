export interface PokemonInfo {
  id: number;
  name: string;
  entry: string;
  imgSrcFront: string;
  imgSrcBack: string;
  types: string[];
  stats: StatInfo;
  moves: MoveInfo[];
}

export interface MoveInfo {
  id: number;
  name: string;
  class: 'physical' | 'special';
  type: string;
  power: number;
}

export interface StatInfo {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: { name: string}
  }[],
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesflavortexts: {
      flavor_text: string
    }[]
  },
  pokemon_v2_pokemonmoves: {
    pokemon_v2_move: {
      id: number,
      name: string,
      power: number,
      pokemon_v2_movedamageclass: {name: 'physical' | 'special'},
      pokemon_v2_type: {name: string}
    }
  }[],
  pokemon_v2_pokemonstats: {
    pokemon_v2_stat: {name: string},
    base_stat: number
  }[],
  pokemon_v2_pokemonsprites: {
    sprites: {
      front_default: string,
      back_default: string,
    }
  }[]
}