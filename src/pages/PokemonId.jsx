import React, { useEffect, useState } from 'react';
import Header from '../components/pokedex/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);

  const { pokemonName } = useParams();

  const percentProgresStat = (baseStat) => {
    const STAT_MAX = 255;
    return `${(baseStat * 100) / STAT_MAX}%`;
  };

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;

    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  const pokeLinearGradients = {
    normal: "bg-gradient-to-t from-rose-900 to-rose-500",
    grass: "bg-gradient-to-t from-black to-green-500",
    fire: "bg-gradient-to-t from-black to-red-500",
    water: "bg-gradient-to-t from-black to-blue-500",
    bug: "bg-gradient-to-t from-black to-green-500",
    normal: "bg-gradient-to-t from-black to-gray-500",
    poison: "bg-gradient-to-t from-black to-purple-500",
    electric: "bg-gradient-to-t from-black to-yellow-500",
    ground: "bg-gradient-to-t from-black to-yellow-500",
    fighting: "bg-gradient-to-t from-black to-red-500",
    psychic: "bg-gradient-to-t from-black to-purple-500",
    rock: "bg-gradient-to-t from-black to-yellow-500",
    ghost: "bg-gradient-to-t from-black to-purple-500",
    ice: "bg-gradient-to-t from-black to-blue-500",
    dragon: "bg-gradient-to-t from-black to-purple-500",
    dark: "bg-gradient-to-t from-black to-gray-500",
    steel: "bg-gradient-to-t from-black to-gray-500",
    fairy: "bg-gradient-to-t from-black to-pink-500",
    flying: "bg-gradient-to-t from-black to-blue-500",
    // ... Otros tipos de Pokémon y sus colores de gradiente
  };

  const pokeBorder = {
    normal: "border-gray-500",
    fighting: "border-orange-700",
    flying: "border-blue-500",
    poison: "border-purple-500",
    ground: " border-yellow-600",
    rock: "border-stone-400",
    bug: "border-green-500",
    ghost: "border-blue-950",
    steel: "border-zinc-400",
    fire: "border-orange-600",
    water: "border-blue-500",
    grass: "border-green-500",
    electric: "border-yellow-500",
    psychic: "border-teal-300",
    ice: "border-sky-200",
    dragon: "-rose-700",
    dark: "border-neutral-900",
    fairy: "border-emerald-300",
    unknown: "border-stone-900",
    shadow: "border-neutral-800"
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <section className="container mx-auto py-6">
        {/* Información detallada del Pokémon */}
        <article className={`bg-white rounded-3xl border-8 ${pokeBorder[pokemon?.types[0].type.name]}`}>
          {/* Imagen del Pokémon */}
          {pokemon && (
            <section className={`relative h-32 ${pokeLinearGradients[pokemon?.types[0].type.name]}`}>
              <div className="flex justify-center items-center">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="w-44 h-52 object-contain ml-8"
                />
              </div>
            </section>
          )}

          {/* Stats */}
          <section className="px-4">
            <h4 className="text-2xl font-bold mb-4">Stats</h4>
            {pokemon?.stats.map((stat) => (
              <article key={stat.stat.url} className="mb-4">
                <section className="flex items-center justify-between">
                  <h5 className="text-lg">{stat.stat.name}</h5>
                  <span className="font-bold">{stat.base_stat}</span>
                </section>

                {/* Barra de progreso de stat */}
                <div className="bg-gray-400 h-3 mt-2">
                  <div
                    style={{ width: percentProgresStat(stat.base_stat) }}
                    className={`h-full ${pokeLinearGradients[pokemon?.types[0].type.name]}`}
                  ></div>
                </div>
              </article>
            ))}

            {/* Lista de Movimientos */}
            <h5 className="text-lg font-bold mb-2">Moves</h5>
            <ul className="flex flex-wrap justify-center">
              {pokemon?.moves.slice(0, 6).map((move) => (
                <li key={move.move.name} className="mb-3 mr-4 px-6 py-1 bg-gray-300 rounded-2xl">
                  {move.move.name}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </section>
    </main>
  );
};

export default PokemonId;
