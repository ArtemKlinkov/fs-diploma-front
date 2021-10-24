/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import MoviesContext from "../contexts/MoviesContext";
import apiClient from "../services/api";

function MoviesProvider(props) {

  const [movies, setMovies] = useState([]); 
  const [movies_refs, setMoviesRefs] = useState([]); 

  const [deletingMovie, setDeletingtMovie] = useState({id: null, name: ""});
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const [showDeletePopup, setDeletePopup] = useState(false);
  const [showCreatePopup, setCreatePopup] = useState(false);
  const [showAddToTimelinePopup, setShowAddToTimelinePopup] = useState(true);

  const handleShowDeletePopup = (id, name) => {
    setDeletePopup(prevState => !prevState);
    setDeletingtMovie({id: id, name: name});
  };

  const handleShowCreatePopup = () => {
    setCreatePopup(prevState => !prevState);
  };

  const handleShowAddToTimelinePopup = () => {
    setShowAddToTimelinePopup(prevState => !prevState);
  };

  const handleDelete = id => {
    apiClient.delete(`${process.env.REACT_APP_CINEMA_API +  '/api/movie'}/${id}`, config).then(() => {
      setMovies(movies.filter((el) => el.id !== id ));
      setDeletePopup(false);
    });
  };

  const handleCreateMovie = async (name, duration) => {
    try {
      const response = await apiClient.post(`${process.env.REACT_APP_CINEMA_API + '/api/movie'}`, { title: name, duration: duration }, config);
      if (response.status === 201) {
        setMovies(prevState => {
          prevState.push(response.data);
          return prevState;
        });
        setCreatePopup(false);
        setError("");
      }
      return response;
    } catch (response_1) {
      setError(response_1.response.data.name);
      return response_1;
    }
  };

  useEffect(() => {
  
    apiClient.get(process.env.REACT_APP_CINEMA_API +  '/api/movie', config).then( response => {
      if (response.status === 200) {
        setMovies(response.data);
      }
    });
  }, []);

  return(
    <MoviesContext.Provider value={{movies, 
                                    movies_refs, 
                                    setMoviesRefs, 
                                    handleDelete, 
                                    handleCreateMovie, 
                                    showDeletePopup, 
                                    handleShowDeletePopup, 
                                    showCreatePopup, 
                                    handleShowCreatePopup, 
                                    deletingMovie, 
                                    showAddToTimelinePopup, 
                                    handleShowAddToTimelinePopup, 
                                    error}}>
      {props.children}
    </MoviesContext.Provider>
  )
}

export default MoviesProvider;