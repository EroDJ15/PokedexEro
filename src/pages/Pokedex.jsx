import React, { useEffect, useState } from 'react';
import Header from '../components/pokedex/Header';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PokemonsList from '../components/pokedex/PokemonsList';
import PokemonCard from '../components/pokedex/PokemonCard';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector(store => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.namePokemon.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const paginarionLogic = () => {
    const POKEMONS_PER_PAGE = 12;
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pagesInBlock, pokemonInPage } = paginarionLogic();

  useEffect(() => {
    if (!currentType) {
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1281';

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type';

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

      axios
        .get(URL)
        .then((res) => {
          const pokemonsByType = res.data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  const getGradientColor = (pokemonIndex) => {
    const colors = [
      'from-red-500 to-yellow-300',
      'from-blue-500 to-green-300',
      'from-purple-500 to-pink-300',
      'from-indigo-500 to-teal-300',
      'from-yellow-500 to-red-300',
      'from-green-500 to-blue-300',
      'from-pink-500 to-purple-300',
      'from-teal-500 to-indigo-300',
      'from-red-700 to-orange-300'
    ];
    const index = pokemonIndex % colors.length;
    return colors[index];
  };

  return (
    <section className="min-h-screen">
      <Header />

      <section className="py-6 px-2 text-center">
        <h3 className='font-semibold text-center'>Welcome {nameTrainer}, here you can find your favorite Pokemon</h3>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center justify-center">
            <input
              id="namePokemon"
              placeholder="Type a Pokemon name..."
              type="text"
              className="mr-2 px-2 py-1 border border-gray-200 rounded focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              Search
            </button>
          </div>


          <select
            onChange={handleChangeType}
            className="mt-2 px-2 py-1 font-semibold border border-gray-200 rounded"
          >
            <option value="">All</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>

        <section className="grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6">
          {pokemonInPage.map((pokemon, index) => (
            <div
              key={pokemon.url}
              className={`p-4 rounded-md shadow-md ${getGradientColor(index)} border`}
            >
              <PokemonCard pokemonUrl={pokemon.url} />
            </div>
          ))}
        </section>

        <ul className="flex gap-2 justify-center py-4">
          <li>
            <button
              className="px-3 py-1 text-black rounded cursor-pointer"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title='primera pagina'>
              {"<<"}
            </button>
          </li>
          <li>
            <button
              className="px-3 py-1 text-black rounded cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
          </li>
          {pagesInBlock.map((numberPage) => (
            <li key={numberPage}>
              <button
                onClick={() => setCurrentPage(numberPage)}
                className={`px-3 py-1 font-bold rounded-md cursor-pointer ${currentPage === numberPage ? 'bg-red-200' : 'hover:bg-red-400'
                  }`}
              >
                {numberPage}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 text-black rounded cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === lastPage}
            >
              {">"}
            </button>
          </li>
          <li>
            <button
              className="px-3 py-1  text-black rounded cursor-pointer"
              onClick={() => setCurrentPage(lastPage)}
              disabled={currentPage === lastPage}
              title='ultima pagina'>
              {">>"}
            </button>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default Pokedex;
