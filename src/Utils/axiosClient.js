import axios from "axios"; 

const axiosClient = axios.create({
  baseURL: "https://coding-platform-backend.vercel.app/",
  // baseURL: "https://coding-platform-backend-qx2iafnqx-harshit-s-projects2.vercel.app",
  withCredentials : true ,         // attach cookies/token
  headers: { 
    "Content-Type": "application/json"
   },
});


export default axiosClient;