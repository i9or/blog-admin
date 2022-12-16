import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Sprites = {
  front_default: string;
};

type PokemonData = {
  name: string;
  sprites: Sprites;
};

export const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["pokemonData"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<PokemonData>(
          "https://pokeapi.co/api/v2/pokemon/ditto/"
        );

        return data;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  });

  return (
    <article>
      {isLoading ? "Loading..." : null}
      {isError ? `An error has occurred!` : null}
      {data ? (
        <>
          <span>Name: </span>
          <span>{data.name}</span>
          <img src={data.sprites.front_default} />
        </>
      ) : null}
    </article>
  );
};
