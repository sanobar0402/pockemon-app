// import { fetch } from 'node-fetch';

export const getPokemon = async (limit, offset) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data;
};

export const getPokemonTypes = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/type`);
  const data = await response.json();
  return data.results;
};

export const getPokemonTypeDetails = async (typeName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}/`);
  const data = await response.json();
  return data;
};
