import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./Pages/HomePage"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));

const Admin = lazy(() => import("./Pages/Admin"));
const AdminPanel = lazy(() => import("./Pages/AdminPanel"));
const UpdateProblem = lazy(()=> import ("./Pages/UpdateProblem"));
const UpdateList = lazy(()=> import("./Pages/UpdateList"))
const DeleteProblem = lazy(() => import("./Pages/DeleteProblem"));

const ProblemPage = lazy(() => import("./Pages/ProblemPage"));
const About = lazy(() => import("./Pages/About"));
const Careers = lazy(() => import("./Pages/Careers"));
const Problem = lazy(() => import("./Pages/Problem"));
const Spinner = lazy(()=> import("./Pages/Spinner"));
const AdminVideo = lazy(()=> import("./Pages/AdminVideo"))
const AdminUpload = lazy(()=> import("./Pages/AdminUpload"));
const Profile = lazy(()=> import("./Pages/Profile"));
const AdminUsers = lazy(()=> import("./Pages/AdminUsers"));
const AdminUserDetails = lazy(()=> import("./Pages/AdminUserDetails")); 
const ContestList = lazy(()=> import("./Pages/ContestList")); 
const SingleContest = lazy(()=> import("./Pages/SingleContest")); 
const ContestProblemPage = lazy(()=> import("./Pages/ContestProblemPage")); 
const Leaderboard = lazy(()=> import("./Pages/Leaderboard")); 
const ContestHistory = lazy(()=> import("./Pages/ContestHistory")); 


const NotFoundPage = lazy(()=> import("./Pages/NotFoundPage"));


// const InterviewLayout = lazy(()=> import("./Pages/InterviewLayout"));
// const InterviewHome = lazy(()=> import("./Pages/InterviewHome"));
// const QuizPage = lazy(()=> import("./Pages/QuizPage"));
// const ResultPage = lazy(()=> import("./Pages/ResultPage"));
// // const InterviewWrapper = lazy (()=>import ("./Pages/InterViewWrapper"))


// import ProfilePage from "./pages/ProfilePage";

import { Routes,Route, Navigate } from "react-router"
import {useState, useEffect } from "react"
import { useDispatch , useSelector } from "react-redux"
import { loadUser } from "./Redux/Features/Auth/authSlice"
import Authloader from "./Pages/Authloader"
import Interview from "./Pages/Interview";
// import MainLayout from "./Pages/MainLayout";





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
    dispatch(loadUser());
}, [dispatch]);



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

// logged out mei route pr nhi jane denge
const protect = (component) => {
  return isAuthenticated ? component : <Navigate to="/login" replace />;
};

const showLoader = useDelayedLoader(loading);
if (showLoader) return <Authloader />
if (loading) return null; // prevents flicker completely
// Flicker Added


  return (
    // <Routes>

    //   {/* HomePage and Login */}
    //   <Route path="/" element={isAuthenticated ? <HomePage></HomePage> : <Navigate to={"/signup"}/>}></Route>
    //   {/* <Route path="/" element={<HomePage/>}></Route> */}
    //   <Route path="/login" element={isAuthenticated?<Navigate to={"/"}/>:<Login></Login>} ></Route>
    //   <Route path="/signup" element={isAuthenticated?<Navigate to={"/"}/>:<Signup></Signup>}></Route>

    //   {/* Admin Panel */}
    //   <Route path="/admin" element={isAuthenticated && user?.role === "admin" ? <Admin/> : <Navigate to="/" />} ></Route>
    //   <Route path="/admin/create" element={isAuthenticated && user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />}/>
    //   <Route path="/admin/update" element={isAuthenticated && user?.role === "admin" ? <UpdateProblem /> : <Navigate to="/" />}/>
    //   <Route path="/admin/delete" element={isAuthenticated && user?.role === "admin" ? <DeleteProblem /> : <Navigate to="/" />}/>

    //   {/* Editor Wala Page */}
    //   <Route path="/problem/:id" element={<ProblemPage/>}></Route>

    //   {/* Footer Pages */}
    //   <Route path="/about" element={<About/>}></Route>
    //   <Route path="/career" element={<Careers/>}></Route>
    //   <Route path="/problems" element={<Problem/>}></Route>
    //   {/* <Route path="/admin/create" element={<AdminPanel/>}></Route>
    //   <Route path="/admin/update" element={<UpdateProblem/>}></Route>
    //   <Route path="/admin/delete" element={<DeleteProblem/>}></Route> */}
    // </Routes>
  <Routes>

    {/* HOME */}
    <Route
      path="/"
      element={
        <Suspense fallback={<Spinner />}>
          <HomePage />
        </Suspense>
      }
    />

    {/* AUTH */}
    <Route
      path="/login"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated ? <Navigate to="/" /> : <Login />}
        </Suspense>
      }
    />

    <Route
      path="/signup"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated ? <Navigate to="/" /> : <Signup />}
        </Suspense>
      }
    />

    {/* PROTECTED USER ROUTES */}
    <Route
      path="/problems"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<Problem />)}
        </Suspense>
      }
    />

    <Route
      path="/problem/:id"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<ProblemPage />)}
        </Suspense>
      }
    />

    <Route
      path="/profile"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<Profile />)}
        </Suspense>
      }
    />

    <Route
      path="/interview"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<Interview />)}
        </Suspense>
      }
    />

    {/* CONTESTS */}
    <Route
      path="/contests"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<ContestList />)}
        </Suspense>
      }
    />

    <Route
      path="/contest/:id"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<SingleContest />)}
        </Suspense>
      }
    />

    <Route
      path="/contest/:contestId/problem/:problemId"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<ContestProblemPage />)}
        </Suspense>
      }
    />

    <Route
      path="/contest/:contestId/leaderboard"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<Leaderboard />)}
        </Suspense>
      }
    />

    <Route
      path="/contests/history"
      element={
        <Suspense fallback={<Spinner />}>
          {protect(<ContestHistory />)}
        </Suspense>
      }
    />

    {/* ADMIN */}
    <Route
      path="/admin"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <Admin />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/create"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <AdminPanel />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/update"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <UpdateList />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/update/:id"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <UpdateProblem />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/delete"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <DeleteProblem />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/upload/:problemId"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <AdminUpload />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/video"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <AdminVideo />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/users"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <AdminUsers />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    <Route
      path="/admin/users/:id"
      element={
        <Suspense fallback={<Spinner />}>
          {isAuthenticated && user?.role === "admin"
            ? <AdminUserDetails />
            : <Navigate to="/" />}
        </Suspense>
      }
    />

    {/* PUBLIC */}
    <Route
      path="/about"
      element={
        <Suspense fallback={<Spinner />}>
          <About />
        </Suspense>
      }
    />

    <Route
      path="/career"
      element={
        <Suspense fallback={<Spinner />}>
          <Careers />
        </Suspense>
      }
    />

    {/* 404 */}
    <Route
      path="*"
      element={
        <Suspense fallback={<Spinner />}>
          <NotFoundPage />
        </Suspense>
      }
    />

  </Routes>
);

}

export default App