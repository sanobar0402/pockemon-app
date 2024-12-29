'use server';

import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';

export default async function PokemonDetails({ params }: { params: { pokemonName: string } }) {
  const { pokemonName } = params;

  let pokemonData = null;

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    pokemonData = res.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }

  if (!pokemonData)
    return <div className="p-6 text-center text-gray-500">Pokemon not found.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-blue-600 text-sm">
        <Link href="/" className="flex items-center gap-1 hover:underline">
          <FiHome /> Home
        </Link>
        <span className="text-gray-400">→</span>
        <span className="capitalize font-semibold">{pokemonData.name}</span>
      </div>

      {/* Pokémon Card centered */}
      <div className="p-6 flex justify-center items-center">
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 w-full max-w-lg shadow-md rounded-lg relative">
          <span className="absolute top-4 right-4 text-md font-extrabold capitalize text-gray-800 z-10">
            #{pokemonData.id}
          </span>

          {/* Top Section with Name, Types, and Image */}
          <div className="bg-gradient-to-b from-blue-50 to-blue-200 shadow-md p-6 rounded-t-lg relative">
            <h1 className="text-xl font-extrabold capitalize text-gray-800">{pokemonData.name}</h1>

            <div className="flex flex-wrap gap-2 mt-2">
              {pokemonData.types.map((type: any) => (
                <span
                  key={type.type.name}
                  className="px-3 bg-white shadow text-blue-800 rounded-full text-sm font-medium capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <img
                src={pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="w-full h-auto md:w-full md:h-auto"
              />
            </div>
          </div>

          {/* Pokémon Details */}
          <div className="p-4 space-y-4 text-gray-600">
            <div>
              <span className="font-semibold text-gray-800">Height:</span> {pokemonData.height / 10} m
            </div>
            <div>
              <span className="font-semibold text-gray-800">Weight:</span> {pokemonData.weight / 10} kg
            </div>
            <div>
              <span className="font-semibold text-gray-800">Base Experience:</span> {pokemonData.base_experience}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Abilities:</span> {pokemonData.abilities.map((ability: any) => ability.ability.name).join(', ')}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Moves:</span> {pokemonData.moves.slice(0, 5).map((move: any) => move.move.name).join(', ')}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Stats:</span>
              <div className="mt-2">
                {pokemonData.stats.map((stat: any) => {
                  const percentage = (stat.base_stat / 255) * 100;

                  return (
                    <div key={stat.stat.name} className="flex items-center gap-4 mb-2">
                      <span className="w-32 text-gray-500 capitalize">{stat.stat.name}:</span>
                      <div className="flex-1 relative h-3 bg-gray-300 rounded-full shadow-inner">
                        <div
                          className={`absolute top-0 left-0 h-full rounded-full transition-all ${
                            stat.base_stat < 50 ? 'bg-red-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-sm font-semibold text-gray-700">{stat.base_stat}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
