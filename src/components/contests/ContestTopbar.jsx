import {
  ArrowLeft,
  Clock,
  Trophy,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function ContestTopbar({
  contestId,
  contestTitle,
  timeLeft,
  solvedCount = 0,
  totalProblems = 0,
}) {
  const navigate = useNavigate();
  

  return (
    <>
      <div className="h-18 border-b border-white/10 bg-[#080C14]/95 backdrop-blur-xl px-5 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>

              <p className="text-xs font-bold tracking-wide text-red-300">
                LIVE CONTEST
              </p>
            </div>

            <h1 className="truncate text-lg font-black text-white">
              {contestTitle}
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <TopBarStat
            icon={<Clock size={16} />}
            label="Time Left"
            value={timeLeft}
            danger={timeLeft?.startsWith("00:")}
          />


          <TopBarStat
            icon={<CheckCircle2 size={16} />}
            label="Solved"
            value={`${solvedCount}/${totalProblems}`}
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-orange-300">
          <Flame size={17} />
          <span className="text-sm font-bold">Contest Mode</span>
        </div>
      </div>

      <div className="md:hidden grid grid-cols-3 gap-2 border-b border-white/10 bg-[#0B0F1A] px-3 py-2">
        <MiniStat label="Time" value={timeLeft} />
        <MiniStat label="Solved" value={`${solvedCount}/${totalProblems}`} />
      </div>
    </>
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