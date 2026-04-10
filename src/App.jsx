// import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"

import HomePage from "@/Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Routes,Route } from "react-router"


function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/login" element={<Login></Login>} ></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>

    </Routes>
  )
}

export default App