import { createContext } from "react";

const MoviesContext = createContext(
  {
    movies: [],
    movies_refs: [],
  }
);

export default MoviesContext;