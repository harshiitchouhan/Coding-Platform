import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { Link } from "react-router";
import { logOut } from "../../Redux/Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../CodeBit.png";
import { useNavigate } from "react-router";
import profile from "../../profile.png"

function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user ,isAuthenticated} = useSelector((state)=>state.auth);
    const handleLogout = ()=>{
        dispatch(logOut());
        navigate("/login");
 
    }

  return (
  <div className=" w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">

    <div className="h-16 max-w-7xl mx-auto flex items-center px-3 sm:px-6 text-white text-sm sm:text-md relative">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/">
        <img src={logo} className="h-8 sm:h-10 w-auto object-contain" alt="Codebit logo" />
      </Link>
      
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-x-6 lg:gap-x-10 text-white">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/problems" className="hover:text-blue-400">Problems</Link>
        <Link to="/contests" className="hover:text-blue-400">Contests</Link>
        <Link to="/interview" className="hover:text-blue-400">Interview</Link>
      </div>

    {/* Right: User */}
    <div className="ml-auto flex items-center">
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full hover:bg-white/10 transition">

            <img
              src={isAuthenticated ? (user?.profileImage || profile) : profile}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover border border-white/10"
            />

            <div className="hidden sm:block text-sm font-medium text-white">
              {isAuthenticated ? user?.name : "Guest"}
            </div>

          </div>
        </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white/5 backdrop-blur-md border border-white/10 text-white">
          {isAuthenticated ? (
            <>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>

              {user?.role === "admin" && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin")}
                  className="text-purple-300 cursor-pointer"
                >
                  Admin Panel
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Login
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/signup")}
                className="text-cyan-400 cursor-pointer"
              >
                Signup
              </DropdownMenuItem>
            </>
          )}

        </DropdownMenuContent>

      </DropdownMenu>
    </div>


    </div>

    {/* Mobile Links */}
    <div className="md:hidden flex justify-center gap-6 py-2 text-white text-sm border-t border-white/10">
      <Link to="/" className="hover:text-blue-400">Home</Link>
      <Link to="/problems" className="hover:text-blue-400">Problems</Link>
      <Link to="/contests" className="hover:text-blue-400">Contests</Link>
      <Link to="/interview" className="hover:text-blue-400">Interview</Link>
    </div>

  </div>
)
}



export default Navbar;