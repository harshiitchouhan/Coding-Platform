import axios from "axios"; 

const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials:true,         // attach cookies/token
  headers: { 
    "Content-Type": "application/json"
   },
});

export default axiosClient