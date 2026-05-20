import { useEffect } from "react";
import axiosClient from "@/Utils/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { setProblems } from "../../Redux/Features/problem/problemSlice";
import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Pagination from "../shared/Pagination";
import { useState } from "react";
import AdminNavbar from "../admin/AdminNavbar";

export default function UpdateList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const problems = useSelector((state) => state.problems.problems);
  const [search, setSearch] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  
    const filteredProblems = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
    );
    const problemsPerPage = 8;
  
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  
    const startIndex = (currentPage - 1) * problemsPerPage;
  
    const currentProblems = filteredProblems.slice(
      startIndex,
      startIndex + problemsPerPage
    );
  
    // Reset page on search
    useEffect(() => {
      setCurrentPage(1);
    }, [search]);

  // Fetch only if Redux empty
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
  }, [problems.length]);

  return (
    <MainLayout showNavbar={false}>
      <AdminNavbar></AdminNavbar>
      <div className="min-h-screen  text-white p-12">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8">
          Update Problems
        </h1>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problem by title..."
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

        {/* Table */}
        <div className="max-w-5xl mx-auto overflow-x-auto border border-white/10 rounded-xl">

          <table className="w-full text-left">

            {/* Header */}
            <thead className="bg-white/5 text-gray-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-white/5">

              {problems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No problems found
                  </td>
                </tr>
              ) : (
                currentProblems.map((p, index) => {

                  const level =
                    p.difficultyLevel.charAt(0).toUpperCase() +
                    p.difficultyLevel.slice(1).toLowerCase();

                  return (
                    <tr
                      key={p._id}
                      className="hover:bg-white/5 transition"
                    >
                      {/* Serial */}
                      <td className="px-6 py-4 text-gray-400">
                        {index + 1}
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4 font-medium text-white">
                        {p.title}
                      </td>

                      {/* Difficulty */}
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

                      {/* Category */}
                      <td className="px-6 py-4 capitalize text-gray-300">
                        {p.category}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            navigate(`/admin/update/${p._id}`)
                          }
                          className="px-3 py-1 text-sm rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                        >
                          Update
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

      </div>
    </MainLayout>
  );
}