import axios from "axios"; 

const axiosClient = axios.create({
  // baseURL: "http://localhost:4000",
   baseURL: "https://your-backend-vercel-url.vercel.app",
  withCredentials : true ,         // attach cookies/token
  headers: { 
    "Content-Type": "application/json"
   },
});


export default axiosClient;