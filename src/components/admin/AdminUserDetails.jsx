import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";
import MainLayout from "../layouts/MainLayout";
import { useNavigate, useParams } from "react-router";
import Pagination from "../shared/Pagination";
import {
  ArrowLeft,
  Ban,
  CheckCircle,
  Mail,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import AdminNavbar from "./AdminNavbar";

export default function AdminUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [solvedPage, setSolvedPage] = useState(1);
  const submissionsPerPage = 8;

  const validSubmissions = submissions.filter((sub) => sub.problemId);

  const totalPages = Math.ceil(validSubmissions.length / submissionsPerPage);

  const startIndex = (currentPage - 1) * submissionsPerPage;

  const currentSubmissions = validSubmissions.slice(
    startIndex,
    startIndex + submissionsPerPage
  );

  // pagination for problem solved
  const solvedPerPage = 8;

  const solvedTotalPages = Math.ceil(
    (user?.problemSolved?.length || 0) / solvedPerPage
  );

  const solvedStartIndex = (solvedPage - 1) * solvedPerPage;

  const currentSolvedProblems =
    user?.problemSolved?.slice(
      solvedStartIndex,
      solvedStartIndex + solvedPerPage
    ) || [];

  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await axiosClient.get(`/admin/users/${id}`);

      setUser(res.data.user);
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const toggleBan = async () => {
    try {
      const res = await axiosClient.patch(`/admin/users/${id}/ban`);

      setUser((prev) => ({
        ...prev,
        isBanned: res.data.user.isBanned,
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user");
    }
  };

  const changeRole = async (role) => {
    try {
      const res = await axiosClient.patch(`/admin/users/${id}/role`, {
        role,
      });

      setUser(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  const deleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/admin/users/${id}`);
      navigate("/admin/users");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading user...
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          User not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showNavbar={false}>
      <AdminNavbar></AdminNavbar>
      <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10 text-white">
        <div className="max-w-7xl mx-auto">

          {/* Back */}
          <button
            onClick={() => navigate("/admin/users")}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Back to Users
          </button>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Profile Card */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">

                <div className="flex flex-col items-center text-center">
                  <img
                    src={
                      user.profileImage ||
                      "https://api.dicebear.com/7.x/initials/svg?seed=User"
                    }
                    alt="profile"
                    className="h-28 w-28 rounded-full object-cover border border-white/10 mb-4"
                  />

                  <h1 className="text-2xl font-bold">{user.name}</h1>

                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                    <Mail size={14} />
                    {user.email}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        user.role === "admin"
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-400/20"
                          : "bg-white/10 text-gray-300 border-white/10"
                      }`}
                    >
                      {user.role}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        user.isBanned
                          ? "bg-red-500/10 text-red-400 border-red-400/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-400/20"
                      }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <InfoRow
                    icon={<User size={16} />}
                    label="Solved Problems"
                    value={user.problemSolved?.length || 0}
                  />

                  <InfoRow
                    icon={<Shield size={16} />}
                    label="Role"
                    value={user.role}
                  />

                  <InfoRow
                    icon={<CheckCircle size={16} />}
                    label="Joined"
                    value={
                      user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"
                    }
                  />
                </div>

                {/* Links */}
                <div className="mt-6 space-y-3">
                 {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-3 py-3 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <GithubSvg />
                    GitHub
                  </a>
                )}

                  {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-3 py-3 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <LinkedinSvg />
                    LinkedIn
                  </a>
                )}
                </div>

                {/* Admin Actions */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={toggleBan}
                    className={`w-full py-2.5 rounded-xl font-medium transition ${
                      user.isBanned
                        ? "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400"
                        : "bg-red-500/15 hover:bg-red-500/25 text-red-400"
                    }`}
                  >
                    {user.isBanned ? "Unban User" : "Ban User"}
                  </button>

                  <select
                    value={user.role}
                    onChange={(e) => changeRole(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-400"
                  >
                    <option className="bg-[#060912]" value="user">User</option>
                    <option className="bg-[#060912]" value="admin">Admin</option>
                  </select>

                  <button
                    onClick={deleteUser}
                    className="w-full py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium transition flex items-center justify-center gap-2"
                  >
                    <Trash2 size={17} />
                    Delete User
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Bio */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <h2 className="text-xl font-bold mb-3">Profile Info</h2>

                <p className="text-gray-300 leading-relaxed">
                  {user.bio || "No bio added yet."}
                </p>
              </div>

              {/* Solved Problems */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <h2 className="text-xl font-bold mb-4">
                  Solved Problems
                </h2>

                {user.problemSolved?.length === 0 ? (
                  <p className="text-gray-400">No solved problems yet.</p>
                ) : (
                  <div className="space-y-3">
                    {currentSolvedProblems.map((problem) => (
                      <div
                        key={problem._id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">{problem.title}</p>
                          <p className="text-gray-400 text-xs">
                            {problem.category}
                          </p>
                        </div>

                        <span className="text-xs text-cyan-300">
                          {problem.difficultyLevel}
                        </span>
                      </div>
                    ))}
                    <Pagination
                      currentPage={solvedPage}
                      totalPages={solvedTotalPages}
                      setCurrentPage={setSolvedPage}
                    />
                  </div>
                  
                )}
              
              </div>

              {/* Recent Submissions */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                <h2 className="text-xl font-bold mb-4">
                  Recent Submissions
                </h2>

                {submissions.length === 0 ? (
                  <p className="text-gray-400">No submissions found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-gray-400">
                        <tr>
                          <th className="text-left py-3">Problem</th>
                          <th className="text-left py-3">Language</th>
                          <th className="text-left py-3">Status</th>
                          <th className="text-left py-3">Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentSubmissions.map((sub) => (
                          <tr
                            key={sub._id}
                            className="border-t border-white/10"
                          >
                            <td className="py-3">
                              {sub.problemId?.title || "Deleted Problem"}
                            </td>

                            <td className="py-3 text-gray-400">
                              {sub.language}
                            </td>

                            <td className="py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  sub.status === "accepted"
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-red-500/10 text-red-400"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>

                            <td className="py-3 text-gray-400">
                              {sub.createdAt
                                ? new Date(sub.createdAt).toLocaleDateString()
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                     <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black/20 border border-white/10 px-4 py-3">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span>{label}</span>
      </div>

      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
function GithubSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.47.12-3.06 0 0 .98-.31 3.2 1.18A11.1 11.1 0 0 1 12 6.04c.99 0 1.98.13 2.91.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.59.24 2.76.12 3.06.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.3 8h4.4v15H.3V8Zm7.1 0h4.22v2.05h.06c.59-1.11 2.03-2.28 4.18-2.28 4.47 0 5.3 2.94 5.3 6.76V23h-4.4v-7.52c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23h-4.4V8Z" />
    </svg>
  );
}