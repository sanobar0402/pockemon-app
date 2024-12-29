export async function getPokemonTypes() {
    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();
    return data.results;
  }