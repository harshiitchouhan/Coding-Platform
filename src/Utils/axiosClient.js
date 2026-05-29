// import axios from "axios"; 

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL ||  "http://localhost:4000",
//   withCredentials : true ,         // attach cookies/token
//   headers: { 
//     "Content-Type": "application/json"
//    },
// });


// export default axiosClient;


import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// har request pe token header mein bhejo
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;