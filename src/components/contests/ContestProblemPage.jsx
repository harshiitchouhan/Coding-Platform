import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Split from "react-split";
import axiosClient from "@/Utils/axiosClient";
import LeftPanel from "../components/problems/LeftPanel";
import RightPanel from "../components/problems/RightPanel";

import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Flame,
} from "lucide-react";

export default function ContestProblemPage() {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [contestStats, setContestStats] = useState({
  solvedCount: 0,
  solvedProblems: [],
  totalProblems: 0,
});

const fetchContestStats = async () => {
  try {
    const res = await axiosClient.get(`/contest/${contestId}/myStats`);

    setContestStats({
      solvedCount: res.data.solvedCount || 0,
      solvedProblems: res.data.solvedProblems || [],
      totalProblems: res.data.totalProblems || 0,
    });

  } catch (err) {
    console.log("Stats error:", err.response?.data || err.message);
  }
};

useEffect(() => {
  fetchContestStats();
}, [contestId]);

  const [language, setLanguage] = useState("cpp");
  const [codeMap, setCodeMap] = useState({});

  useEffect(() => {
    const fetchContestProblem = async () => {
      try {
        const res = await axiosClient.get(
          `/contest/${contestId}/problem/${problemId}`
        );

        setProblem(res.data.problem);
        setContest(res.data.contest);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContestProblem();
  }, [contestId, problemId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const timeLeft = contest
    ? formatDuration(new Date(contest.endTime) - now)
    : "00:00:00";

  

  if (loading) {
    return (
      <div className="h-screen bg-[#0B0F1A] text-white flex items-center justify-center">
        Loading contest problem...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="h-screen bg-[#0B0F1A] text-white flex items-center justify-center">
        Problem not found
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0B0F1A] text-gray-200 overflow-hidden">
      {/* Contest Navbar */}
      <div className="h-18 border-b border-white/10 bg-[#080C14]/95 backdrop-blur-xl px-5 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => navigate(`/contest/${contestId}`)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </div>

              <p className="text-xs font-bold tracking-wide text-red-300">
                LIVE CONTEST
              </p>
            </div>

            <h1 className="truncate text-lg font-black text-white">
              {contest?.title}
            </h1>
          </div>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-3">
          <TopBarStat
            icon={<Clock size={16} />}
            label="Time Left"
            value={timeLeft}
            danger={timeLeft.startsWith("00:")}
          />

          <TopBarStat
            icon={<CheckCircle2 size={16} />}
            label="Solved"
            value={`${contestStats.solvedCount}/${contestStats.totalProblems}`}
          />
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-orange-300">
          <Flame size={17} />
          <span className="text-sm font-bold">Contest Mode</span>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="md:hidden grid grid-cols-3 gap-2 border-b border-white/10 bg-[#0B0F1A] px-3 py-2">
        <MiniStat label="Time" value={timeLeft} />
        <MiniStat
          label="Solved"
          value={`${contestStats.solvedCount}/${contest?.problems?.length || 0}`}
        />
      </div>

      {/* Main Editor */}
      <div className="h-[calc(100vh-72px)] flex bg-[#0B0F1A] text-gray-200 overflow-hidden">
        <Split
          className="flex flex-1 w-full h-full overflow-hidden"
          sizes={[47, 53]}
          minSize={[500, 500]}
          gutterSize={6}
        >
          {/* LEFT */}
          <div className="overflow-y-auto h-full min-w-0">
            <div className="max-w-3xl mx-auto px-6 py-5">
              

              <LeftPanel
                problem={problem}
                mode="contest"
                contestId={contestId}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 min-w-0 flex flex-col bg-[#111827] p-4 overflow-hidden">
            <RightPanel
              problemId={problem._id}
              problem={problem}
              mode="contest"
              contestId={contestId}
              fetchContestStats={fetchContestStats}
              language={language}
              setLanguage={setLanguage}
              codeMap={codeMap}
              setCodeMap={setCodeMap}
            />
          </div>
        </Split>
      </div>
    </div>
  );
}

function TopBarStat({ icon, label, value, danger }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-4 py-2 ${
        danger
          ? "border-red-400/20 bg-red-400/10 text-red-300"
          : "border-white/10 bg-white/5 text-cyan-300"
      }`}
    >
      {icon}

      <div>
        <p className="text-[11px] text-gray-400">{label}</p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-xs font-bold text-white">{value}</p>
    </div>
  );
}