export interface PokemonInfo {
  id: number;
  name: string;
  imgSrcFront: string;
  imgSrcBack: string;
  types: string[];
  moves?: string[];
}