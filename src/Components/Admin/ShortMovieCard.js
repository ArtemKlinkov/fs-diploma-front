import MoviesContext from "../../contexts/MoviesContext";
import { useContext } from "react";

function ShortMovieCard(props) {
  const {movie} = props;
  const {handleShowDeletePopup} = useContext(MoviesContext);  
  const handleDelete = (movie) => {
    handleShowDeletePopup(movie);
  }

  const getMinutesCount = (start_time) => {
    const timeParts = start_time.split(":");
    return (+timeParts[0]) * 60 + (+timeParts[1]);
  } 

  return(
    <div onClick={() => handleDelete(movie)} key={movie.id} className="conf-step__seances-movie" style={{width: movie.duration * 0.5, backgroundColor: movie.backgroundColor, left: getMinutesCount(movie.start_time) * 0.5}}>
      <p className="conf-step__seances-movie-title">{movie.title}</p>
      <p className="conf-step__seances-movie-start">{movie.start_time}</p>
    </div>
  )
}

export default ShortMovieCard