/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import MoviesContext from "../../contexts/MoviesContext";

import apiClient from "../../services/api";
import ShortMovieCard from "./ShortMovieCard";
function Timeline(props) {
  const {timeline} = useContext(MoviesContext);  
  const {id, title} = props;
  const [moviesSchedule, setMoviesSchedule] = useState([]); 
  const { token } = useContext(AuthContext);
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const getBackgroundColor = (id) => {
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
  }, [id, timeline]);

  return(
    <div className="conf-step__seances-hall">
      <h3 className="conf-step__seances-title">{title}</h3>
      <div className="conf-step__seances-timeline">
      {moviesSchedule.map((movie) => <ShortMovieCard key={movie.id} movie={movie} />)}        
      </div>
    </div> 
  )
}

export default Timeline;