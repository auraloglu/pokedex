export function PokemonType({ type }: { type: string }) {
  return (
    <h2 className="text-sm rounded border-solid border-2 px-4 py-2 my-6 mx-2">
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </h2>
  )
}
