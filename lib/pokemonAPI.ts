const POKEMON_API = "https://pokeapi.co/api/v2/"

export async function getPokemonList() {
  const response = await fetch(POKEMON_API + "pokemon?limit=151&offset=0")

  const data = await response.json()
  return data.results
}

export async function getPokemon(name: string) {
  const response = await fetch(POKEMON_API + "pokemon/" + name)
  const data = await response.json()

  return data
}

export async function getPokemonEvolution(name: string) {
  const response = await fetch(POKEMON_API + "pokemon-species/" + name)
  const data = await response.json()

  const evolutionResponse = await fetch(data.evolution_chain.url)
  const evolutionData = await evolutionResponse.json()

  return evolutionData.chain
}
