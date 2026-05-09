import {
  LayoutDashboard,
  PlusCircle,
  Pencil,
  Trash2,
  Video,
  Users,
  LogOut,
  Home,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/Features/Auth/authSlice";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    { title: "Panel", icon: LayoutDashboard, path: "/admin" },
    { title: "Create", icon: PlusCircle, path: "/admin/create" },
    { title: "Update", icon: Pencil, path: "/admin/update" },
    { title: "Delete", icon: Trash2, path: "/admin/delete" },
    { title: "Videos", icon: Video, path: "/admin/video" },
    { title: "Users", icon: Users, path: "/admin/users" },
  ];

  const handleLogout = async () => {
    await dispatch(logOut()).unwrap();
    navigate("/login");
  };

  return (
    <div className="sticky top-4 z-50 px-4">
      <div
        className="mx-auto max-w-6xl rounded-2xl border border-white/10 
        bg-white/5 backdrop-blur-xl shadow-xl shadow-black/30"
      >
        <div className="flex h-14 items-center justify-between px-4 text-white">
          
          {/* Left */}
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
          >
            <Home size={16} />
            Main Site
          </Link>

          {/* Center */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/20"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm 
            bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden overflow-x-auto border-t border-white/10 px-3 py-3">
          <div className="flex min-w-max gap-2">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm whitespace-nowrap transition
                  ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/20"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}