import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";

export default function SubmissionHistory({ problemId }) {
  const [submissions, setSubmissions] = useState([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        setSubmissions(res.data);
        // console.log("API response:", res.data); 
      } catch (err) {
        console.log(err);
      }
      
    };

    fetchSubmissions();
  }, [problemId]);

  const normalizeStatus = (status) => {
  if (!status) return "other";

  const s = status.toLowerCase();

  if (s.includes("accept")) return "accepted";
  if (s.includes("time")) return "tle";
  if (s.includes("runtime")) return "runtime_error";
  if (s.includes("compile")) return "compilation_error";
  if (s.includes("wrong")) return "wrong_answer";

  return "other";
};

const filtered = submissions
  .filter((s) => !s.status?.toLowerCase().includes("pending"))
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const openCodeModal = (code) => {
  setSelectedCode(code);
  setShowCodeModal(true);
};

const closeCodeModal = () => {
  setSelectedCode("");
  setShowCodeModal(false);
};


return (
  <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
    <table className="w-full text-left">

      {/* HEADER */}
      <thead className="bg-white/5 text-gray-300 text-sm uppercase">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Language</th>
          <th className="p-3">Runtime (ms)</th>
          <th className="p-3">Memory (KB)</th>
          <th className="p-3">Status</th>
          <th className="p-3">Code</th>
          <th className="p-3">Time</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {filtered.length === 0 ? (
          <tr>
            <td colSpan="7" className="p-4 text-center text-gray-400">
              No submissions yet
            </td>
          </tr>
        ) : (
          filtered.map((s, index) => {
            const st = normalizeStatus(s.status);

            return (
              <tr
                key={s._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                {/* Number */}
                <td className="p-3 text-gray-400">{index + 1}</td>

                {/* Language */}
                <td className="p-3 capitalize">
                  {s.language || "-"}
                </td>

                {/* Runtime */}
                <td className="p-3" >
                  {s.runtime
                    ? (s.runtime * 1000).toFixed(2)
                    : "0"}
                </td>

                {/* Memory */}
                <td className="p-3">
                  {s.memory ?? "0"}
                </td>

                {/* Status */}
                <td className="p-3 whitespace-nowrap">
                <span
                    className={`px-3 py-1 text-xs rounded-full ${
                    st === "accepted"
                        ? "bg-green-500/10 text-green-400"
                        : st === "tle"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : st === "runtime_error"
                        ? "bg-red-500/10 text-red-400"
                        : st === "compilation_error"
                        ? "bg-purple-500/10 text-purple-400"
                        : st === "wrong_answer"
                        ? "bg-red-500/10 text-red-400"   
                        : "bg-gray-500/10 text-gray-400"
                    }`}
                >
                    {s.status
                        ?.split(" ")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")
                    }
                </span>
                </td>

                {/* Code */}
                <td className="p-3">
                <button
                    onClick={() => openCodeModal(s.code)}
                    className="text-blue-400 hover:text-blue-500 text-sm"
                >
                    View
                </button>
                </td>

                {/* Time */}
                <td className="p-3 text-xs text-gray-400">
                  {s.createdAt
                    ? new Date(s.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            );
          })
        )}
      </tbody>

    </table>

    {showCodeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-[#111827] border border-white/10 rounded-xl w-full max-w-2xl p-6">

            <h2 className="text-lg font-semibold mb-4">Submitted Code</h2>

            <pre className="bg-black/40 p-4 rounded-lg text-sm overflow-auto max-h-80">
                {selectedCode}
            </pre>

            <div className="flex justify-end mt-4">
                <button
                onClick={closeCodeModal}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
                >
                Close
                </button>
            </div>

            </div>
        </div>
        )}
  </div>
);
}