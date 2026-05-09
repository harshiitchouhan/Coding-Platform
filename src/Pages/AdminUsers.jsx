import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router";
import {
  Search,
  Shield,
  User,
  Ban,
  CheckCircle,
  Eye,
  Trash2,
} from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import Pagination from "./Pagination";

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [banFilter, setBanFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBan = async (id) => {
    try {
      const res = await axiosClient.patch(`/admin/users/${id}/ban`);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, isBanned: res.data.user.isBanned }
            : user
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/admin/users/${id}`);

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    const matchesBan =
      banFilter === "all" ||
      (banFilter === "banned" && user.isBanned) ||
      (banFilter === "active" && !user.isBanned);

    return matchesSearch && matchesRole && matchesBan;
  });

  const usersPerPage = 10;

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  return (
    <MainLayout showNavbar={false}>
      <AdminNavbar></AdminNavbar>
      <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-12 text-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-cyan-400 text-sm font-medium mb-2">
              Admin Dashboard
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold">
              User Management
            </h1>

            <p className="text-gray-400 mt-2">
              Manage users, admins, bans and account actions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              icon={<User />}
              title="Total Users"
              value={users.length}
            />

            <StatCard
              icon={<Shield />}
              title="Admins"
              value={users.filter((u) => u.role === "admin").length}
            />

            <StatCard
              icon={<Ban />}
              title="Banned"
              value={users.filter((u) => u.isBanned).length}
            />
          </div>

          {/* Filters */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cyan-400"
                />
              </div>

            <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 text-white"
            >
            <option className="bg-[#020617] text-white" value="all">All Roles</option>
            <option className="bg-[#020617] text-white" value="user">Users</option>
            <option className="bg-[#020617] text-white" value="admin">Admins</option>
            </select>

            <select
                value={banFilter}
                onChange={(e) => setBanFilter(e.target.value)}
                className="bg-transparent border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400 text-white"
                >
                <option className="bg-[#020617] text-white" value="all">All Status</option>
                <option className="bg-[#020617] text-white" value="active">Active</option>
                <option className="bg-[#020617] text-white" value="banned">Banned</option>
            </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            {loading ? (
              <div className="p-10 text-center text-gray-400">
                Loading users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/10 text-gray-300">
                    <tr>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Joined</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                user.profileImage ||
                                "https://api.dicebear.com/7.x/initials/svg?seed=User"
                              }
                              alt="profile"
                              className="h-10 w-10 rounded-full object-cover border border-white/10"
                            />

                            <div>
                              <p className="font-medium text-white">
                                {user.name}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs border ${
                              user.role === "admin"
                                ? "bg-cyan-500/10 text-cyan-300 border-cyan-400/20"
                                : "bg-white/10 text-gray-300 border-white/10"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="p-4">
                          {user.isBanned ? (
                            <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                              <Ban size={14} /> Banned
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs">
                              <CheckCircle size={14} /> Active
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-gray-400">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                navigate(`/admin/users/${user._id}`)
                              }
                              className="p-2 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-cyan-300 transition"
                              title="View"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              onClick={() => toggleBan(user._id)}
                              className={`p-2 rounded-lg transition ${
                                user.isBanned
                                  ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/10 hover:bg-red-500/20 text-red-400"
                              }`}
                              title={user.isBanned ? "Unban" : "Ban"}
                            >
                              <Ban size={16} />
                            </button>

                            <button
                              onClick={() => deleteUser(user._id)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          
          </div>
        </div>
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      </div>
      
    </MainLayout>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}