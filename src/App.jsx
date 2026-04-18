
import HomePage from "@/Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import About from "./Pages/About"
import Careers from "./Pages/Careers"
import { Routes,Route, Navigate } from "react-router"
import {useState, useEffect } from "react"
import { useDispatch , useSelector } from "react-redux"
// import { authCheck } from "./Features/authSlice"
import Authloader from "./Pages/Authloader"
import { loadUser } from "./Features/authSlice"



function App() {


  
  // need to check isAuthenticated // if true -> Home Page else -> Login/Signup
  const {isAuthenticated,loading,user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  // check if user is authenticated
  // useEffect(()=>{
  //   dispatch(authCheck());
  // },[dispatch]);

  // bring back user details if he/she refreshes the page
    useEffect(() => {
    // console.log("App mounted, calling loadUser")
    dispatch(loadUser());
}, [dispatch]);

//  if (loading) {
//   return (
//     <Authloader></Authloader>
//   );
// }

// Flicker Added Html body and css alsoS
  function useDelayedLoader(loading, delay = 300) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    } else {
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [loading, delay]);

  return showLoader;
}

useEffect(() => {
  const loader = document.getElementById("preloader");

  if (loader) {
    // Wait for next paint (React rendered)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
          loader.remove();
        }, 300);
      });
    });
  }
}, []);

const showLoader = useDelayedLoader(loading);
if (showLoader) return <Authloader />
if (loading) return null; // prevents flicker completely
// Flicker Added


  return (
    <Routes>

      <Route path="/" element={isAuthenticated ? <HomePage></HomePage> : <Navigate to={"/signup"}/>}></Route>
      {/* <Route path="/" element={<HomePage/>}></Route> */}
      <Route path="/login" element={isAuthenticated?<Navigate to={"/"}/>:<Login></Login>} ></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to={"/"}/>:<Signup></Signup>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/career" element={<Careers/>}></Route>

    </Routes>
  )
}

export default App