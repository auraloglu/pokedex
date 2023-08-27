"use client"

import { useState, useEffect } from "react"
import { getPokemon } from "@/lib/pokemonAPI"
import { PokemonImage } from "./pokemon-image"
import Link from "next/link"

export function PokemonEvolution({ chain }: { chain: any }) {
  const [evolutionTree, setEvolutionTree] = useState<any>([])

  useEffect(() => {
    createEvolutionArray(chain)
  }, [])

  const createEvolutionArray = (evolutionChain: any) => {
    if (evolutionChain.evolves_to.length === 0) {
      getPokemon(evolutionChain.species.name).then((pokemonObject) => {
        setEvolutionTree((prev: any) => [...prev, pokemonObject])
      })
      return
    } else {
      getPokemon(evolutionChain.species.name)
        .then((pokemonObject) => {
          setEvolutionTree((prev: any) => [...prev, pokemonObject])
        })
        .then(() => {
          createEvolutionArray(evolutionChain.evolves_to[0])
        })
    }
  }

  const renderEvolutionTree = () => {
    return evolutionTree.map((pokemonObject: any, i: number) => {
      return (
        <div
          className="flex justify-center items-center"
          key={pokemonObject.name + "container"}
        >
          <Link href={`../${pokemonObject.name}`}>
            <div
              className="m-4 relative gap-4"
              style={{ width: "150px", height: "150px" }}
            >
              <PokemonImage
                image={
                  pokemonObject.sprites.other["official-artwork"].front_default
                }
                name={pokemonObject.name}
                key={pokemonObject.name + "evo"}
              />
            </div>
          </Link>
          {i !== evolutionTree.length - 1 && (
            <div className="font-bold text-4xl">{`>`}</div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="flex flex-col mt-16">
      <h2 className="text-2xl font-semibold text-center">Evolution Chain</h2>
      <div className="flex">{renderEvolutionTree()}</div>
    </div>
  )
}
