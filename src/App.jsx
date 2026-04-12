
import HomePage from "@/Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Routes,Route, Navigate } from "react-router"
import { useEffect } from "react"
import { useDispatch , useSelector } from "react-redux"
import { authCheck } from "./Features/authSlice"


function App() {

  
  // need to check isAuthenticated // if true -> Home Page else -> Login/Signup
  const {isAuthenticated,loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  // check if user is authenticated
  useEffect(()=>{
    dispatch(authCheck());
  },[dispatch]);

 if (loading) {
  return (
    
    
    <div className="min-h-screen w-full relative bg-black overflow-hidden">

      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(99, 102, 241, 0.12), transparent 60%), #000000",
        }}
      />

      {/* Blur Layer */}
      <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_45%)]" />
      <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>

    </div>
        );
}

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <HomePage></HomePage>:<Navigate to={"/signup"}/>}></Route>

      {/* <Route path="/" element={<HomePage/>}></Route> */}
      <Route path="/login" element={isAuthenticated?<Navigate to={"/"}/>:<Login></Login>} ></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to={"/"}/>:<Signup></Signup>}></Route>

    </Routes>
  )
}

export default App