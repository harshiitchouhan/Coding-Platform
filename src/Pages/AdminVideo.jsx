import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { setProblems } from "../Redux/Features/problem/problemSlice";
import { NavLink, useNavigate } from "react-router";
import MainLayout from "./MainLayout";
import Pagination from "./Pagination";
import AdminNavbar from "./AdminNavbar";

export default function AdminVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const problems = useSelector((state) => state.problems.problems);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  const filteredProblems = problems.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const problemsPerPage = 8;
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;

  const currentProblems = filteredProblems.slice(
    startIndex,
    startIndex + problemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const fetchProblems = async () => {
      if (problems.length > 0) return;

      try {
        const res = await axiosClient.get("/problem/allProblem");
        dispatch(setProblems(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProblems();
  }, [dispatch, problems.length]);

  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
    setConfirmText("");
  };

  const closeModal = () => {
    setSelectedId(null);
    setShowModal(false);
    setConfirmText("");
  };

const handleDelete = async () => {
  try {
    await axiosClient.delete(`/video/delete/${selectedId}`);

    closeModal();
    alert("Video deleted successfully");
  } catch (err) {
    alert(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to delete video."
    );

    closeModal();
  }
};

  const isAllowed = confirmText === "DELETE";

  return (
    <MainLayout showNavbar={false}>
      <AdminNavbar></AdminNavbar>
      <div className="min-h-screen text-white p-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          Manage Problem Videos
        </h1>

        <div className="max-w-5xl mx-auto mb-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problem by title..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Upload</th>
                <th className="px-6 py-4 text-right">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No problems found
                  </td>
                </tr>
              ) : (
                currentProblems.map((p, index) => {
                  const level =
                    p.difficultyLevel?.charAt(0).toUpperCase() +
                    p.difficultyLevel?.slice(1).toLowerCase();

                  return (
                    <tr key={p._id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4 text-gray-400">
                        {startIndex + index + 1}
                      </td>

                      <td className="px-6 py-4 font-medium text-white">
                        {p.title}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            p.difficultyLevel === "easy"
                              ? "bg-green-500/10 text-green-400"
                              : p.difficultyLevel === "medium"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {level}
                        </span>
                      </td>

                      <td className="px-6 py-4 capitalize text-gray-300">
                        {p.category}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <NavLink to={`/admin/upload/${p._id}`}
                          className="px-3 py-1 text-sm rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                        >
                          Upload
                        </NavLink>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openModal(p._id)}
                          className="px-3 py-1 text-sm rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#111827] p-6 rounded-xl w-100 border border-white/10 shadow-xl">
              <h2 className="text-lg font-semibold mb-4 text-white">
                Confirm Video Delete
              </h2>

              <p className="text-sm text-gray-400 mb-4">
                Type{" "}
                <span className="text-red-400 font-semibold">DELETE</span> to
                confirm.
              </p>

              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-3 py-2 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-gray-500/10 text-gray-300 hover:bg-gray-500/20 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={!isAllowed}
                  className={`px-4 py-2 rounded-lg transition ${
                    isAllowed
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-red-500/30 text-red-200 cursor-not-allowed"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}