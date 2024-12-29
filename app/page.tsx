import { getPokemon, getPokemonTypes, getPokemonTypeDetails } from './utils/pokemonApi';
import { FiSearch } from 'react-icons/fi';
import PokemonGrid from './components/PokemonGrid';

export const metadata = {
  title: 'SSR Pokémon',
};

export default async function Home({ searchParams }: any) {
  const { search = '', type = '' } = searchParams || {};

  // Fetch base Pokémon data
  const pokemonData = await getPokemon(120, 0);
  const types = await getPokemonTypes();

  let filteredPokemons = pokemonData.results;

  // Apply type filter if a type is selected
  if (type) {
    const typeData = await getPokemonTypeDetails(type);
    const typeFilteredPokemonNames = typeData.pokemon.map((p: any) => p.pokemon.name);

    filteredPokemons = filteredPokemons.filter((pokemon: any) =>
      typeFilteredPokemonNames.includes(pokemon.name)
    );
  }

  // Apply search filter
  filteredPokemons = filteredPokemons.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
        Pokémon List
      </h1>

      {/* Filters Section */}
      <form method="GET" className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        {/* Type Dropdown */}
        <select
          name="type"
          defaultValue={type}
          className="w-full md:w-1/4 border border-gray-300 rounded-lg p-3 text-gray-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {types.map((type:any) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search Pokémon..."
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-gray-700 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </form>

      {/* Pokémon Grid */}
      <PokemonGrid pokemons={filteredPokemons} />

      {/* No Results */}
      {filteredPokemons.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No Pokémon found. Try adjusting your filters.
        </p>
      )}
    </main>
  );
}
