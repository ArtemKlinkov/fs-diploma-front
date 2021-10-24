/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import MoviesContext from "../contexts/MoviesContext";

import apiClient from "../services/api";
function Timeline(props) {
  const {movies_refs} = useContext(MoviesContext);  
  const {id, title} = props;
  const [moviesSchedule, setMoviesSchedule] = useState([]); 
  const { token } = useContext(AuthContext);
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const getMinutesCount = (start_time) => {
    const timeParts = start_time.split(":");
    return (+timeParts[0]) * 60 + (+timeParts[1]);
  } 

  const getBackgroundColor = (id) => {
    const foundEl = movies_refs.find((el) => el.movie_id === id ); 
    if (foundEl !== undefined) {
      return foundEl.movie_ref.current.style.backgroundColor; 
    }
    return ("rgb(133, 255, 137)");
  }  

  useEffect(() => {
    apiClient.get(`${process.env.REACT_APP_CINEMA_API}/api/movie_schedule/${id}`, config)
    .then( response => {
      if (response.status === 200) {
        const result = [];
        response.data.forEach( (el) => {
          return result.push({id: el.id, title: el.movie.title, start_time: el.start_time, duration: el.movie.duration, backgroundColor: getBackgroundColor(el.id)})
        });
        setMoviesSchedule(result);
      } else {
        setMoviesSchedule([]);
      }
    })
    .catch( err => console.error(err)); 
  }, [id]);

  return(
    <div className="conf-step__seances-hall">
      <h3 className="conf-step__seances-title">{title}</h3>
      <div className="conf-step__seances-timeline">
      {moviesSchedule.map((movie) => (
        <div key={movie.id} className="conf-step__seances-movie" style={{width: movie.duration * 0.5, backgroundColor: movie.backgroundColor, left: getMinutesCount(movie.start_time) * 0.5}}>
          <p className="conf-step__seances-movie-title">{movie.title}</p>
          <p className="conf-step__seances-movie-start">{movie.start_time}</p>
        </div>))}        
      </div>
    </div> 
  )
}

export default Timeline;