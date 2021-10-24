import { useRef } from "react";
import poster from "../img/poster.png"

function Movie(props) {
  const {movie} = props;
  const movie_ref = useRef(null);

  return(
    <div ref={movie_ref} className="conf-step__movie">

      <img className="conf-step__movie-poster" alt="poster" src={poster} />
      <h3 className="conf-step__movie-title">{movie.title}</h3>
      <p className="conf-step__movie-duration">{movie.duration} минут</p>
    </div>
  )
}

export default Movie