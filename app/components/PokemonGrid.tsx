import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

type Pokemon = {
  name: string;
  url: string;
};

type PokemonGridProps = {
  pokemons: Pokemon[];
};

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className="border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-gradient-to-t from-gray-50 to-white overflow-hidden"
        >
          {/* Pokémon Image */}
          <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemon.url.split('/')[6]
              }.png`}
              alt={pokemon.name}
              className="w-40 h-auto mx-auto"
            />
          </div>

          {/* Pokémon Name */}
          <h3 className="text-xl font-semibold text-center mt-4 capitalize text-gray-800">
            {pokemon.name}
          </h3>

          {/* Detail Link */}
          <div className="text-center mt-6 mb-4">
            <Link
              href={`/${pokemon.name}`}
              className="text-blue-600 flex items-center justify-center gap-2 font-semibold hover:underline"
            >
              View Details <FiArrowRight className="text-lg" />
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>    
  );
};

export default PokemonGrid;
