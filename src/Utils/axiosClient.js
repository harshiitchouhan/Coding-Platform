import axios from "axios"; 

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials : true ,         // attach cookies/token
  headers: { 
    "Content-Type": "application/json"
   },
});


export default axiosClient;