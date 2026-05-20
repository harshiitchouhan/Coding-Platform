import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";
import {
  CheckCircle2,
  XCircle,
  Clock3,
} from "lucide-react";

export default function ContestSubmissionHistory({
  contestId,
  problemId,
}) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [contestId, problemId]);

  const fetchSubmissions = async () => {
    try {
      const res = await axiosClient.get(
        `/contest/${contestId}/submissions/${problemId}`
      );

      setSubmissions(res.data.submissions || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-gray-400">
        Loading submissions...
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 text-center">
        <h3 className="text-xl font-semibold text-white">
          No contest submissions yet
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Your submissions for this contest problem will appear here after you submit.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((sub) => {
        const formattedStatus =
          sub.status
            ?.split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

  return (
    <div
      key={sub._id}
      className="rounded-2xl border border-white/10 bg-[#111827] p-5"
    >
      <div className="flex items-start justify-between">

        <div className="flex-1">

          {/* STATUS */}
          <div className="flex items-center gap-2">
            {sub.status === "accepted" ? (
              <CheckCircle2
                className="text-emerald-400"
                size={20}
              />
            ) : (
              <XCircle
                className="text-red-400"
                size={20}
              />
            )}

            <p
              className={`font-semibold ${
                sub.status === "accepted"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {formattedStatus}
            </p>
          </div>

          {/* INFO */}
          <div className="mt-3 flex flex-wrap gap-3 text-sm">

            <span className="rounded-xl bg-cyan-500/10 px-3 py-1 text-cyan-300">
              {sub.language.toUpperCase()}
            </span>

            {/* <span className="rounded-xl bg-yellow-500/10 px-3 py-1 text-yellow-300">
              +{sub.points || 0} Points
            </span> */}

            <span className="rounded-xl bg-emerald-500/10 px-3 py-1 text-emerald-300">
              {sub.runtime || 0} ms
            </span>

          </div>

          {/* CODE */}
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <div className="border-b border-white/10 bg-black/30 px-3 py-2 text-xs text-gray-400">
              Submitted Code
            </div>

            <pre className="max-h-60 overflow-auto bg-black/20 p-4 text-sm text-gray-300">
              <code>{sub.code}</code>
            </pre>
          </div>

        </div>

        {/* TIME */}
        <div className="ml-5 flex items-center gap-2 text-sm text-gray-400">
          <Clock3 size={15} />

          {new Date(sub.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
})}
    </div>
  );
}