/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import HallContext from "../contexts/HallContext";
import apiClient from "../services/api";

function HallProvider(props) {

  const [halls, setHalls] = useState([]);
  const [deletingHall, setDeletingtHall] = useState({id: null, name: ""});
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const [showDeletePopup, setDeletePopup] = useState(false);
  const [showCreatePopup, setCreatePopup] = useState(false);


  const handleShowDeletePopup = (id, name) => {
    setDeletePopup(prevState => !prevState);
    setDeletingtHall({id: id, name: name});
  };

  const handleShowCreatePopup= () => {
    setCreatePopup(prevState => !prevState);
  };

  const handleDelete = id => {
    apiClient.delete(`${process.env.REACT_APP_CINEMA_API +  '/api/hall'}/${id}`, config).then(() => {
      setHalls(halls.filter((el) => el.id !== id ));
      setDeletePopup(false);
    });
  };

  const handleCreateHall = async (name) => {
    try {
      const response = await apiClient.post(`${process.env.REACT_APP_CINEMA_API + '/api/hall'}`, { name: name }, config);
      if (response.status === 201) {
        setHalls(prevState => {
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
  
    apiClient.get(process.env.REACT_APP_CINEMA_API +  '/api/hall', config).then( response => {
      if (response.status === 200) {
        setHalls(response.data);
      }
    });
  }, []);

  return(
    <HallContext.Provider value={{halls, handleDelete, handleCreateHall, showDeletePopup, handleShowDeletePopup, showCreatePopup, handleShowCreatePopup, deletingHall, error}}>
      {props.children}
    </HallContext.Provider>
  )
}

export default HallProvider;