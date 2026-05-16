import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router";
import axiosClient from "@/Utils/axiosClient";
import MainLayout from "./MainLayout";
import {
  Trophy,
  Clock,
  Users,
  Code2,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Flame,
  History
} from "lucide-react";

export default function ContestList() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchContests();
  }, []);

// timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

//backend api call
  const fetchContests = async () => {
    try {
      const res = await axiosClient.get("/contest/allContest");
      setContests(res.data.contests || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

// to gather registerattion of participant
  const registerContest = async (contestId) => {
  try {
    const res = await axiosClient.post(`/contest/registerContest/${contestId}`);

    setContests((prev) =>
      prev.map((contest) =>
        contest._id === contestId
          ? {
              ...contest,
              isRegistered: true,
              participants: [
                ...(contest.participants || []),
                "me",
              ],
            }
          : contest
      )
    );
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};

  const getContestStatus = (startTime, endTime) => {
    // console.log(startTime,endTime);
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Live";
    return "Ended";
  };

// countfown kis format me show krna
  const formatDuration = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const getTimeInfo = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) return `Starts in ${formatDuration(start - now)}`;
    if (now <= end) return `Ends in ${formatDuration(end - now)}`;
    return "Contest ended";
  };

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

  const gridClass =
    contests.length === 1
      ? "mx-auto max-w-[430px] grid-cols-1"
      : contests.length === 2
      ? "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2"
      : "mx-auto max-w-7xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <MainLayout>
      <section className="relative min-h-screen overflow-hidden px-6 pt-16 pb-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 -top-45 h-130 w-230 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />
          <div className="absolute left-10 top-72 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute right-10 top-56 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 text-center">
        
            <h1 className="bg-linear-to-r from-white via-cyan-200 to-sky-300 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
              CodeBit Contests
            </h1>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Sparkles size={16} />
              Compete. Solve. Rank Up.
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-base text-gray-400 md:text-lg">
              Join coding battles, solve curated DSA problems, and climb the
              leaderboard.
            </p>
            <button
                onClick={() => navigate("/contests/history")}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                <History size={18} />
                Contest History
              </button>
          </div>

          {loading ? (
            <div className={`grid gap-7 ${gridClass}`}>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-107.5 animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : contests.length === 0 ? (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/6 p-12 text-center backdrop-blur-xl">
              <Trophy className="mx-auto mb-4 text-cyan-300" size={44} />
              <h2 className="text-2xl font-bold">No contests available</h2>
              <p className="mt-2 text-gray-400">
                New contests will appear here once created.
              </p>
            </div>
          ) : (
            <div className={`grid gap-7 ${gridClass}`}>
              {contests.map((contest) => {
                const status = getContestStatus(
                  contest.startTime,
                  contest.endTime
                );

                return (
                  <ContestCard
                      key={contest._id}
                      contest={contest}
                      status={status}
                      timeInfo={getTimeInfo(contest.startTime, contest.endTime)}
                      formatIndianTime={formatIndianTime}
                      registerContest={registerContest}
                      navigate={navigate}
                    />
                );
              })}
            </div>
            
          )}
          
        </div>
      </section>
    </MainLayout>
  );
}

function ContestCard({ contest, status, timeInfo, formatIndianTime,registerContest,navigate }) {
  const statusStyle = {
    Live: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
    Upcoming: "bg-yellow-400/15 text-yellow-300 border-yellow-400/30",
    Ended: "bg-red-400/15 text-red-300 border-red-400/30",
  };

  const glowStyle = {
    Live: "from-emerald-400/25 via-cyan-400/10 to-transparent",
    Upcoming: "from-yellow-400/20 via-cyan-400/10 to-transparent",
    Ended: "from-red-400/20 via-white/5 to-transparent",
  };

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/9">
      <div
        className={`absolute inset-0 bg-linear-to-br ${glowStyle[status]} opacity-80`}
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300 ring-1 ring-cyan-400/20">
              <Trophy size={24} />
            </div>

            <div>
              <h2 className="line-clamp-1 text-xl font-bold text-white">
                {contest.title}
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Competitive Programming
              </p>
            </div>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
          >
            {status}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-300">
          {contest.description ||
            "Solve exciting problems and test your DSA skills."}
        </p>

        <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-300">
            {status === "Live" ? <Flame size={16} /> : <Clock size={16} />}
            <span>{timeInfo}</span>
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
            label="Mode"
            value="Solo"
          />
        </div>

        <button
          onClick={() => {
            if (status === "Upcoming") {
              if (!contest.isRegistered) {
                registerContest(contest._id);
              }
              return;
            }

            if (status === "Live") {
              if (contest.isRegistered) {
                navigate(`/contest/${contest._id}`);
              } else {
                alert("Registration closed");
              }
              return;
            }

            navigate(`/contest/${contest._id}/leaderboard`);
          }}
          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
            status === "Upcoming" && contest.isRegistered
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              : status === "Live" && !contest.isRegistered
              ? "border-red-400/20 bg-red-400/10 text-red-300"
              : "border-white/10 bg-white/5 text-cyan-200 hover:border-cyan-300/30 hover:bg-cyan-400/10"
          }`}
        >
          <span>
            {status === "Upcoming"
              ? contest.isRegistered
                ? "Registered ✓"
                : "Register Now"
              : status === "Live"
              ? contest.isRegistered
                ? "Enter Contest"
                : "Registration Closed"
              : "View Leaderboard"}
          </span>

          <ArrowRight size={18} />
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