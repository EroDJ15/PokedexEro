import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//Aqui se pone el color definido 
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
    fairy: "bg-gradient-to-t from-black to-pink-500",
    fighting: "bg-gradient-to-t from-black to-red-500",
    psychic: "bg-gradient-to-t from-black to-purple-500",
    rock: "bg-gradient-to-t from-black to-yellow-500",
    ghost: "bg-gradient-to-t from-black to-purple-500",
    ice: "bg-gradient-to-t from-black to-blue-500",
    dragon: "bg-gradient-to-t from-black to-purple-500",
    dark: "bg-gradient-to-t from-black to-gray-500",
    steel: "bg-gradient-to-t from-black to-gray-500",
    flying: "bg-gradient-to-t from-black to-blue-500",
    unknown: "rose-500"
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

}

const textFont = {
    normal: "text-rose-900",
    fighting: "text-orange-700",
    flying: "text-yellow-900",
    poison: "text-violet-900",
    ground: " text-amber-800",
    rock: "text-stone-400",
    bug: "text-lime-600",
    ghost: "text-blue-950",
    steel: "text-zinc-400",
    fire: "text-orange-600",
    water: "text-sky-500",
    grass: "text-lime-500",
    electric: "text-amber-100",
    psychic: "text-teal-300",
    ice: "text-sky-200",
    dragon: "-rose-700",
    dark: "text-neutral-900",
    fairy: "text-emerald-300",
    unknown: "text-stone-900",
    shadow: "text-neutral-800"
}

const PokemonCard = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState(null)

    const formatTypesPokemon = (types = []) => {
        const nameTypes = types.map((type) => type.type.name)
        const titleTypes = nameTypes.join(" / ")
        return titleTypes
    };

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(({ data }) => setPokemon(data))
            .catch((err) => console.log(err))
    }, []);

    return (
        <article className={`border-8 ${pokeBorder[pokemon?.types[0].type.name]} 
        rounded-3xl `}>
            <Link to={`/pokedex/${pokemon?.name}`}>
                {/*seccion superior*/}
                <section className={`relative h-40 
                 ${pokeLinearGradients[pokemon?.types[0].type.name]}
                 `}>
                    <div className='absolute px-12 -bottom-14'>
                        <img src={pokemon?.sprites.other["official-artwork"].front_default}
                            alt={pokemon?.name} />
                    </div>
                </section>

                {/*seccion inferior*/}
                <section className=' text-center capitalize'>

                    <h3 className={`mt-14 text-center capitalize font-sans
                    ${textFont[pokemon?.types[0].type.name]}
                     font-bold text-3xl`}>{pokemon?.name}</h3>
                    <h5 className='text-center text-lg'>{formatTypesPokemon(pokemon?.types)}</h5>
                    <span className='text-stone-400 text-sm'>Type</span>
                    <hr />

                    <section className='grid grid-cols-2 p-4'>
                        {/*Generar la lista de stats*/}
                        {
                            pokemon?.stats.slice(0, 4).map(stat => (
                                <div key={stat.stat.url}>
                                    <h6 className='text-stone-400 text-sm p-2'>{stat.stat.name}</h6>
                                    <span className={`font-bold ${textFont[pokemon?.types[0].type.name]}`}>{stat.base_stat} </span>
                                </div>
                            ))}
                    </section>
                </section>

            </Link>
        </article>
    )
}

export default PokemonCard