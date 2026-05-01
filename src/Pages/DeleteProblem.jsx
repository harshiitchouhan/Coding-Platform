import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";
import { Trash2 } from "lucide-react";
import MainLayout from "./MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { setProblems, deleteProblem} from "../Redux/Features/problem/problemSlice"


export default function AdminProblems() {
  // const [problems, setProblems] = useState([]);

  const problems = useSelector((state) => state.problems.problems);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // fetch all problems
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

  // open modal
  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
    setConfirmText("");
  };

  // close modal
  const closeModal = () => {
    setSelectedId(null);
    setShowModal(false);
    setConfirmText("");
  };

  // delete API call
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/problem/delete/${selectedId}`);

      dispatch(deleteProblem(selectedId)); //instant UI update

      closeModal();
    } catch (err) {
      console.log(err);
    }
};

  const isAllowed = confirmText === "DELETE";

  return (
    <MainLayout>
    <div className="min-h-screen text-white p-6">

      <h1 className="text-4xl text-gray-300 text-center font-bold mt-10 mb-10">Delete Problems</h1>

      {/* TABLE */}
      <div className="max-w-5xl mx-auto overflow-x-auto">

        <div className="rounded-xl border border-white/20 overflow-hidden">

          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-white/10 text-gray-200">
              <tr className="border-b border-white/20">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Difficulty</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {problems.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.difficultyLevel}</td>
                  <td className="p-3">{p.category}</td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => openModal(p._id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-500 ml-auto"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          </div>
        </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-[#111827] border border-white/10 p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-semibold mb-2">
              Confirm Deletion
            </h2>

            <p className="text-gray-400 mb-4">
              This action is irreversible. Type <span className="text-white font-bold">DELETE</span> to confirm.
            </p>

            {/* CONFIRM INPUT */}
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type "DELETE" here'
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={!isAllowed}
                className={`px-4 py-2 rounded-lg font-semibold transition
                ${isAllowed
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
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