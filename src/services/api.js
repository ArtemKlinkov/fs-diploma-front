import axios from 'axios';
 
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_CINEMA_API,
    // headers: {'Accept': 'application/json'},
    withCredentials: true,
});
 
export default apiClient;