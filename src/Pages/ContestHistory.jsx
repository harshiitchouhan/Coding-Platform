import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosClient from "@/Utils/axiosClient";
import MainLayout from "./MainLayout";
import {
  ArrowLeft,
  Trophy,
  Clock,
  Code2,
  Users,
  CalendarDays,
  ArrowRight,
  History,
} from "lucide-react";
import Pagination from "./Pagination";


export default function ContestHistory() {
  const navigate = useNavigate();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 6;

  const totalPages = Math.ceil(
    contests.length / contestsPerPage
    );

    const startIndex = (currentPage - 1) * contestsPerPage;

    const currentContests = contests.slice(
    startIndex,
    startIndex + contestsPerPage);


  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axiosClient.get("/contest/history");
      setContests(res.data.contests || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

    const gridClass =
    contests.length === 1
      ? "mx-auto max-w-[430px] grid-cols-1"
      : contests.length === 2
      ? "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2"
      : "mx-auto max-w-7xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  const formatIndianTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden px-6 pt-12 pb-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 -top-45 h-130 w-230 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />
          <div className="absolute left-10 top-72 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute right-10 top-56 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <button
            onClick={() => navigate("/contests")}
            className="mb-8 flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to active contests
          </button>

          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <History size={34} />
            </div>

            <h1 className="bg-linear-to-r from-white via-cyan-200 to-sky-300 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
              Contest History
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-gray-400 md:text-lg">
              View past contests, final standings, rankings and submissions.
            </p>
          </div>

          {loading ? (
            <div className={`grid gap-7  ${gridClass}`}>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : contests.length === 0 ? (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/6 p-12 text-center backdrop-blur-xl">
              <Trophy className="mx-auto mb-4 text-cyan-300" size={44} />
              <h2 className="text-2xl font-bold">No past contests yet</h2>
              <p className="mt-2 text-gray-400">
                Ended contests will appear here.
              </p>
            </div>
          ) : (
            <div className={`grid gap-7  ${gridClass}`}>
              {currentContests.map((contest) => (
                <HistoryCard
                  key={contest._id}
                  contest={contest}
                  formatIndianTime={formatIndianTime}
                  navigate={navigate}
                />
              ))}
            </div>
            
          )}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                />
            </div>
        )}
          
        </div>
        
      </section>
    </MainLayout>
  );
}

function HistoryCard({ contest, formatIndianTime, navigate }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/9">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 via-transparent to-yellow-400/10 opacity-80" />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-yellow-400/10 p-3 text-yellow-300 ring-1 ring-yellow-400/20">
              <Trophy size={24} />
            </div>

            <div>
              <h2 className="line-clamp-1 text-xl font-bold text-white">
                {contest.title}
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Completed Contest
              </p>
            </div>
          </div>

          <span className="rounded-full border border-red-400/30 bg-red-400/15 px-3 py-1 text-xs font-semibold text-red-300">
            Ended
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-300">
          {contest.description ||
            "View final leaderboard and contest results."}
        </p>

        <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-300">
            <Clock size={16} />
            Contest completed
          </div>

          <div className="space-y-1 text-xs text-gray-400">
            <p>
              Start:{" "}
              <span className="text-gray-300">
                {formatIndianTime(contest.startTime)}
              </span>
            </p>

            <p>
              End:{" "}
              <span className="text-gray-300">
                {formatIndianTime(contest.endTime)}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <StatBox
            icon={<Code2 size={16} />}
            label="Problems"
            value={contest.problems?.length || 0}
          />

          <StatBox
            icon={<Users size={16} />}
            label="Players"
            value={contest.participants?.length || 0}
          />

          <StatBox
            icon={<CalendarDays size={16} />}
            label="Status"
            value="Final"
          />
        </div>

        <button
          onClick={() => navigate(`/contest/${contest._id}/leaderboard`)}
          className="flex w-full items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
        >
          <span>Watch Leaderboard</span>
          <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </button>
      </div>

      
    </div>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
      <div className="mb-1 flex justify-center text-cyan-300">{icon}</div>
      <p className="text-base font-bold text-white">{value}</p>
      <p className="text-[11px] text-gray-500">{label}</p>
    </div>
  );
}