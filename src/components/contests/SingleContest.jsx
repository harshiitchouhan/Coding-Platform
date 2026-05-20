import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosClient from "@/Utils/axiosClient";
import MainLayout from "./MainLayout";
import ContestTopbar from "./ContestTopbar";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Code2,
  Flame,
  Info,
  Lock,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";

export default function SingleContest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [contestStats, setContestStats] = useState({
    solvedCount: 0,
    solvedProblems: [],
    totalProblems: 0,
  });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [now, setNow] = useState(new Date());
  

  useEffect(() => {
    fetchContest();
    fetchContestStats();
  }, [id]);

  // after contest finish return to contest list later isko leader board pr redirect krdenge
  useEffect(() => {
  if (!contest) return;

  const endTime = new Date(contest.endTime).getTime();

  if (Date.now() >= endTime) {

    alert("Contest has ended");

    setTimeout(() => {
      navigate("/contests");
    }, 500);

  }
}, [now, contest, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchContest = async () => {
    try {
      setLoading(true);

      const res = await axiosClient.get(`/contest/singleContest/${id}`);

      setContest(res.data.contest);
      setIsRegistered(res.data.isRegistered || false);
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to load contest");
    } finally {
      setLoading(false);
    }
  };

  const fetchContestStats = async () => {
    try {
      const res = await axiosClient.get(`/contest/${id}/myStats`);

      setContestStats({
        solvedCount: res.data.solvedCount || 0,
        solvedProblems: res.data.solvedProblems || [],
        totalProblems: res.data.totalProblems || 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
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

  const contestStarted = contest ? now >= new Date(contest.startTime) : false;
  const contestEnded = contest ? now > new Date(contest.endTime) : false;

  const timeLeft = contest
    ? formatDuration(new Date(contest.endTime) - now)
    : "00:00:00";

  const solvedSet = useMemo(() => {
    return new Set(
      (contestStats.solvedProblems || []).map((id) => id.toString())
    );
  }, [contestStats.solvedProblems]);

  const totalPossiblePoints = useMemo(() => {
    if (!contest?.problems) return 0;

    return contest.problems.reduce((sum, item) => {
      return sum + (item.points || 0);
    }, 0);
  }, [contest]);

  const earnedPoints = useMemo(() => {
    if (!contest?.problems) return 0;

    return contest.problems.reduce((sum, item) => {
      const problemId = item.problem?._id?.toString();

      if (solvedSet.has(problemId)) {
        return sum + (item.points || 0);
      }

      return sum;
    }, 0);
  }, [contest, solvedSet]);

  if (loading) return <ContestSkeleton />;

  if (err || !contest) {
    return (
      <MainLayout showNavbar={false}>
        <div className="min-h-screen bg-black px-6 py-28 text-white">
          <BackgroundGlow />

          <div className="relative z-10 mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/6 p-10 text-center backdrop-blur-xl">
            <Lock className="mx-auto mb-4 text-red-300" size={42} />

            <h1 className="text-3xl font-black">Contest Locked</h1>

            <p className="mt-3 text-gray-400">
              {err || "Unable to open this contest."}
            </p>

            <button
              onClick={() => navigate("/contests")}
              className="mt-7 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-black hover:bg-cyan-300"
            >
              Back to Contests
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showNavbar={false}>
      <ContestTopbar
        contestId={id}
        contestTitle={contest.title}
        timeLeft={timeLeft}
        solvedCount={contestStats.solvedCount}
        totalProblems={contestStats.totalProblems}
      />

      <section className="relative min-h-screen overflow-hidden px-6 py-10 text-white">
        <BackgroundGlow />

        <div className="relative z-10 mx-auto max-w-7xl">
          <button
            onClick={() => navigate("/contests")}
            className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to contests
          </button>

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/6 p-8 backdrop-blur-xl shadow-2xl md:p-10">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/15 via-sky-500/8 to-transparent" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                  <Sparkles size={16} />
                  CodeBit Official Contest
                </div>

                <h1 className="max-w-4xl bg-linear-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-7xl">
                  {contest.title}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300">
                  {contest.description ||
                    "Solve problems, collect points, manage penalty, and climb the leaderboard."}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <InfoCard
                    icon={<CalendarDays size={20} />}
                    label="Start Time"
                    value={formatIndianTime(contest.startTime)}
                  />

                  <InfoCard
                    icon={<Clock size={20} />}
                    label="End Time"
                    value={formatIndianTime(contest.endTime)}
                  />

                  <InfoCard
                    icon={<Code2 size={20} />}
                    label="Problems"
                    value={contest.problems?.length || 0}
                  />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-orange-400/20 bg-black/40 p-7 backdrop-blur-xl">
                <div className="absolute inset-0 bg-linear-to-br from-orange-400/10 via-yellow-300/5 to-transparent" />
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-orange-400/20 blur-[90px]" />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-orange-400/15 text-yellow-300 ring-1 ring-orange-400/30">
                      <Flame size={34} />
                    </div>

                    <StatusBadge
                      contestStarted={contestStarted}
                      contestEnded={contestEnded}
                    />
                  </div>

                  <h2 className="text-3xl font-black">
                    {contestEnded
                      ? "Contest Ended"
                      : contestStarted
                      ? "Contest is Live"
                      : "Contest Starts Soon"}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Score depends on accepted problems. Penalty will be used
                    later for ranking when points are tied.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <ScoreBox
                      label="Earned"
                      value={earnedPoints}
                      color="text-emerald-300"
                    />

                    <ScoreBox
                      label="Total"
                      value={totalPossiblePoints}
                      color="text-cyan-300"
                    />

                    <ScoreBox
                      label="Solved"
                      value={`${contestStats.solvedCount}/${contestStats.totalProblems}`}
                      color="text-yellow-300"
                    />

                    <ScoreBox
                      label="Time Left"
                      value={timeLeft}
                      color="text-red-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RULES + SCORING */}
          <div className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

              {/* Background Glow */}
              <div className="absolute inset-0">
                <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />
                <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />
                <div className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-sky-400/10 blur-[90px]" />
              </div>

              {/* Top Heading */}
              <div className="relative z-10 mb-8 flex items-center justify-between">
                <div>
                  <h2 className="bg-linear-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-3xl font-black text-transparent">
                    Contest Rules & Scoring
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Understand how ranking, points and penalties work during the contest.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300">
                  <BookOpen size={18} />
                  <span className="text-sm font-bold">Read Carefully</span>
                </div>
              </div>

              {/* Cards */}
              <div className="relative z-10 grid gap-6 lg:grid-cols-3">
                <RuleCard
                  icon={<Target size={22} />}
                  title="How Points Work"
                  items={[
                    "Each problem has fixed points.",
                    "Accepted solution gives full points.",
                    "Wrong submissions give no points.",
                  ]}
                />

                <RuleCard
                  icon={<Clock size={22} />}
                  title="Penalty Rules"
                  items={[
                    "Penalty is counted only for solved problems.",
                    "Earlier accepted submissions get lower penalty.",
                    "Wrong attempts before AC can increase penalty.",
                  ]}
                />

                <RuleCard
                  icon={<ShieldCheck size={22} />}
                  title="Contest Rules"
                  items={[
                    "Only registered users can enter.",
                    "Submissions close after end time.",
                    "Final rank depends on points and penalty.",
                  ]}
                />
              </div>
          </div>

          {/* PROBLEMS */}
          <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black">Problem Set</h2>
              <p className="mt-1 text-gray-400">
                Solve cards one by one and collect points.
              </p>
            </div>

            <button
              onClick={() => navigate(`/contest/${contest._id}/leaderboard`)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:border-cyan-300/30 hover:bg-cyan-400/10"
            >
              <Trophy size={18} />
              View Leaderboard
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {contest.problems?.map((item, index) => {
              const problem = item.problem;
              const problemId = problem?._id?.toString();
              const solved = solvedSet.has(problemId);
              const points = item.points || 0;

              return (
                <ProblemCard
                  key={problemId || index}
                  index={index}
                  problem={problem}
                  points={points}
                  solved={solved}
                  contestStarted={contestStarted}
                  contestEnded={contestEnded}
                  onSolve={() =>
                    navigate(`/contest/${contest._id}/problem/${problem._id}`)
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

function ProblemCard({
  index,
  problem,
  points,
  solved,
  contestStarted,
  contestEnded,
  onSolve,
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
        solved
          ? "border-emerald-400/30 bg-emerald-400/8"
          : "border-white/10 bg-white/6 hover:border-cyan-300/40 hover:bg-white/9"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 via-transparent to-emerald-400/10 opacity-0 transition group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
            <span className="text-xl font-black">{index + 1}</span>
          </div>

          {solved ? (
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
              <CheckCircle2 size={14} />
              Solved
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
              <XCircle size={14} />
              Unsolved
            </div>
          )}
        </div>

        <p className="text-sm text-gray-400">Problem {index + 1}</p>

        <h3 className="mt-1 line-clamp-1 text-2xl font-black text-white">
          {problem?.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge text={problem?.difficultyLevel} />
          <Badge text={problem?.category} />
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Problem Points</p>
              <p className="text-2xl font-black text-cyan-300">{points}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Earned</p>
              <p
                className={`text-right text-2xl font-black ${
                  solved ? "text-emerald-300" : "text-gray-500"
                }`}
              >
                {solved ? points : 0}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onSolve}
          disabled={!contestStarted || contestEnded}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-black transition ${
            contestEnded
              ? "cursor-not-allowed bg-white/10 text-gray-500"
              : !contestStarted
              ? "cursor-not-allowed bg-yellow-400/10 text-yellow-300"
              : solved
              ? "bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/20"
              : "bg-cyan-400 text-black hover:bg-cyan-300"
          }`}
        >
          {contestEnded
            ? "Contest Ended"
            : !contestStarted
            ? "Not Started"
            : solved
            ? "Open Again"
            : "Solve Now"}

          {contestStarted && !contestEnded && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}

function RuleCard({ icon, title, items }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
        {icon}
      </div>

      <h3 className="text-xl font-black text-white">{title}</h3>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3 text-sm text-gray-400">
            <Info className="mt-0.5 shrink-0 text-cyan-300" size={15} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:scale-105">
      <div className="mb-2 text-cyan-300">{icon}</div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-lg font-black text-white">{value}</p>
    </div>
  );
}

function ScoreBox({ label, value, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ contestStarted, contestEnded }) {
  if (contestEnded) {
    return (
      <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-bold text-red-300">
        ENDED
      </span>
    );
  }

  if (contestStarted) {
    return (
      <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        LIVE
      </span>
    );
  }

  return (
    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">
      UPCOMING
    </span>
  );
}

function Badge({ text }) {
  const value = text
    ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    : "General";

  const styles = {
    Easy: "bg-emerald-400/10 text-emerald-300",
    Medium: "bg-yellow-400/10 text-yellow-300",
    Hard: "bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[value] || "bg-cyan-400/10 text-cyan-300"
      }`}
    >
      {value}
    </span>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 -top-52 h-140 w-240 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />
      <div className="absolute left-10 top-80 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute right-10 top-60 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />
    </div>
  );
}

function ContestSkeleton() {
  return (
    <MainLayout showNavbar={false}>
      <div className="min-h-screen bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-90 rounded-[2.5rem] border border-white/10 bg-white/5" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}