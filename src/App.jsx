
import HomePage from "@/Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Routes,Route, Navigate } from "react-router"
import { useEffect } from "react"
import { useDispatch , useSelector } from "react-redux"
import { authCheck } from "authSlice"


function App() {

  // need to check isAuthenticated // if true -> Home Page else -> Login/Signup
  const {isAuthenticated} = useSelector((state)=>state.auth);

  useEffect(()=>{
    useDispatch(authCheck());
  },[dispatch]);

  

  return (
    <Routes>

      <Route path="/" element={isAuthenticated?<HomePage></HomePage>:<Navigate to={"/signup"}/>}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to={"/"}/>:<Login></Login>} ></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to={"/"}/>:<Signup></Signup>}></Route>

    </Routes>
  )
}

export default App