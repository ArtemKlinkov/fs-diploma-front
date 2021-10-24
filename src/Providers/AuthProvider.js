import { useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import apiClient from '../services/api';
import useStorage from '../hooks/useStorage';

function AuthProvider(props) {
  const [token, setToken] = useStorage(localStorage, 'auth-token');
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (email, password) => {
    apiClient.get(process.env.REACT_APP_CINEMA_API +  '/sanctum/csrf-cookie').then( response => {
      setError("");
      setPasswordError("");
      apiClient.post(process.env.REACT_APP_CINEMA_API + '/api/token/create', {'email':email, 'password': password, 'device_name': window.navigator.userAgent}
      ).then(response => {
        setToken(response.data.token);
      }).catch(e => {
        if (e.response.status === 401) {
          setError(e.response.data.error)
        } else if (e.response.status === 422) {
          if ( e.response.data.hasOwnProperty('email')) {
          setError(e.response.data.email[0]);
          }
          if ( e.response.data.hasOwnProperty('password')) {
            setPasswordError(e.response.data.password[0]);
          }
        }
      })
    });
  }

  const handleLogout = () => {
    setToken(null);
  }

  return(
    <AuthContext.Provider value={{handleLogin, handleLogout, token, error, passwordError}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;