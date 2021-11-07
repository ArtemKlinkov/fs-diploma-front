import poster from "../img/poster.png"
import MoviesContext from "../contexts/MoviesContext";
import { useContext } from "react";

function Movie(props) {
  const {movie} = props;
  const {handleShowAddToTimelinePopup, setAddedMovie} = useContext(MoviesContext);

  const handleAddMovie = (id) => {
    setAddedMovie(id);
    handleShowAddToTimelinePopup(true);
  }

  return(
    <div className="conf-step__movie" onClick={() => handleAddMovie(movie.id)} >
      <img className="conf-step__movie-poster" alt="poster" src={poster} />
      <h3 className="conf-step__movie-title">{movie.title}</h3>
      <p className="conf-step__movie-duration">{movie.duration} минут</p>
    </div>
  )
}

export default Movie