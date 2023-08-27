import { getPokemon, getPokemonEvolution } from "@/lib/pokemonAPI"
import { PokemonImage } from "@/components/pokemon-image"
import { Progress } from "@/components/ui/progress"
import { PokemonType } from "@/components/poekomon-type"
import { PokemonEvolution } from "@/components/pokemon-evolve"

export default async function PokemonPage({
  params,
}: {
  params: { pokemonName: string }
}) {
  const { pokemonName } = params

  const pokemonObject = await getPokemon(pokemonName)
  const pokemonEvolution = await getPokemonEvolution(pokemonName)

  return (
    <>
      <div className="flex-col justify-center items-center">
        <h1 className="text-4xl text-bold pt-4">
          {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
        </h1>
        <h5 className="text-sm text-center mt-2">
          Weight: {pokemonObject.weight}
        </h5>
      </div>

      <div className="flex">
        {pokemonObject.types.map((type: any) => {
          return (
            <PokemonType type={type.type.name} key={type.type.name + "type"} />
          )
        })}
      </div>
      <div
        className="m-4"
        style={{ position: "relative", width: "300px", height: "300px" }}
      >
        <PokemonImage
          image={pokemonObject.sprites.other["official-artwork"].front_default}
          name={pokemonName}
        />
      </div>
      <div className="flex-col">
        {pokemonObject.stats.map((statObject: any) => {
          const statName = statObject.stat.name
          const statValue = statObject.base_stat
          return (
            <div
              className="flex items-strech"
              style={{ width: "500px" }}
              key={statName}
            >
              <h3 className="p-3 w-2/4">
                {statName}: {statValue}
              </h3>
              <Progress className="w-2/4 m-auto" value={statValue} />
            </div>
          )
        })}
      </div>
      <PokemonEvolution chain={pokemonEvolution} />
    </>
  )
}
