import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosClient from "@/Utils/axiosClient";
import MainLayout from "./MainLayout";

import {
  ArrowLeft,
  Crown,
  Medal,
  Trophy,
  Timer,
  Target,
  Flame,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react";

export default function Leaderboard() {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [contestId]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axiosClient.get(`/contest/${contestId}/leaderboard`);
      setContest(res.data.contest);
      setLeaderboard(res.data.leaderboard || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const problems = contest?.problems || [];
  const topThree = leaderboard.slice(0, 3);

  const totalSubmissions = useMemo(() => {
    return leaderboard.reduce((sum, row) => {
      return (
        sum +
        Object.values(row.problems || {}).reduce((s, p) => {
          return s + (p.wrongAttempts || 0) + (p.solved ? 1 : 0);
        }, 0)
      );
    }, 0);
  }, [leaderboard]);

  if (loading) return <LeaderboardSkeleton />;

  return (
    <MainLayout showNavbar={false}>
      <section className="relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white">
        <BackgroundGlow />

        <div className="relative z-10 mx-auto max-w-7xl">
          <button
            onClick={() => navigate("/contests")}
            className="mb-7 flex items-center gap-2 text-sm text-gray-400 transition hover:text-cyan-300"
          >
            <ArrowLeft size={17} />
            Back to contests
          </button>

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/6 p-8 backdrop-blur-xl shadow-2xl md:p-10">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/15 via-sky-500/8 to-transparent" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-400/15 blur-[120px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-bold text-yellow-300">
                  <Trophy size={16} />
                  Final / Live Standings
                </div>

                <h1 className="max-w-4xl bg-linear-to-r from-white via-cyan-100 to-yellow-200 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-7xl">
                  Leaderboard
                </h1>

                <p className="mt-4 text-xl font-bold text-white">
                  {contest?.title}
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
                  Ranking is based on higher points first. If points are tied,
                  lower penalty wins.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:w-[560px]">
                <StatBox
                  icon={<User size={18} />}
                  label="Players"
                  value={leaderboard.length}
                />
                <StatBox
                  icon={<Target size={18} />}
                  label="Problems"
                  value={problems.length}
                />
                <StatBox
                  icon={<Flame size={18} />}
                  label="Submits"
                  value={totalSubmissions}
                />
                <StatBox
                  icon={<Timer size={18} />}
                  label="Mode"
                  value="Penalty"
                />
              </div>
            </div>
          </div>

        {/* TOP RANKERS */}
        {topThree.length > 0 && (
        <div className="mt-10 rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-black text-white">Top Performers</h2>
                <p className="mt-1 text-sm text-gray-400">
                Best coders ranked by points and penalty.
                </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                Live Ranking
            </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
            {topThree.map((row) => (
                <PodiumCard key={row.user._id} row={row} />
            ))}
            </div>
        </div>
        )}

        {/* STANDINGS */}
        <div className="mt-10 rounded-[2.2rem] border border-white/10 bg-[#070B12]/90 p-6 backdrop-blur-xl shadow-2xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
            <h2 className="text-3xl font-black text-white">Full Standings</h2>
            <p className="mt-1 text-sm text-gray-400">
                Higher points wins. If tied, lower penalty gets better rank.
            </p>
            </div>

            <div className="flex gap-3 text-sm">
            <span className="rounded-xl bg-emerald-400/10 px-3 py-2 font-bold text-emerald-300">
                + Solved
            </span>
            <span className="rounded-xl bg-red-400/10 px-3 py-2 font-bold text-red-300">
                - Wrong
            </span>
            </div>
        </div>

        <div className="overflow-x-auto rounded-[1.6rem] border border-white/10">
            <table className="w-full min-w-[950px] border-collapse">
            <thead>
                <tr className="bg-white/[0.06] text-xs uppercase tracking-[0.18em] text-gray-400">
                <th className="px-6 py-5 text-left">Rank</th>
                <th className="px-6 py-5 text-left">Coder</th>
                <th className="px-6 py-5 text-center">Solved</th>
                <th className="px-6 py-5 text-center">Points</th>
                <th className="px-6 py-5 text-center">Penalty</th>

                {problems.map((item, index) => (
                    <th key={item.problem?._id || index} className="px-4 py-5 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-black text-cyan-300">
                        {index + 1}
                    </div>
                    </th>
                ))}
                </tr>
            </thead>

            <tbody>
                {leaderboard.map((row) => (
                <tr
                    key={row.user._id}
                    className="border-t border-white/10 bg-white/[0.02] transition hover:bg-cyan-400/[0.06]"
                >
                    <td className="px-6 py-5">
                    <RankBadge rank={row.rank} />
                    </td>

                    <td className="px-6 py-5">
                    <UserCell user={row.user} />
                    </td>

                    <td className="px-6 py-5 text-center text-lg font-black text-white">
                    {row.solvedCount}
                    </td>

                    <td className="px-6 py-5 text-center text-lg font-black text-emerald-300">
                    {row.totalPoints}
                    </td>

                    <td className="px-6 py-5 text-center text-lg font-black text-yellow-300">
                    {row.totalPenalty}
                    </td>

                    {problems.map((item, index) => {
                    const problemId = item.problem?._id?.toString();
                    const stat = row.problems?.[problemId];

                    return (
                        <td key={problemId || index} className="px-4 py-5 text-center">
                        <ProblemStatus stat={stat} />
                        </td>
                    );
                    })}
                </tr>
                ))}
            </tbody>
            </table>

            {leaderboard.length === 0 && (
            <div className="p-14 text-center text-gray-400">
                No submissions yet.
            </div>
            )}
        </div>
        </div>
                </div>
            </section>
            </MainLayout>
        );
        }

function PodiumCard({ row }) {
  const rankStyle = {
    1: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    2: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
    3: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition hover:-translate-y-1 ${
        rankStyle[row.rank] || "border-white/10 bg-white/6 text-white"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/30">
            {row.rank === 1 ? <Crown size={28} /> : <Medal size={28} />}
          </div>

          <p className="text-4xl font-black">#{row.rank}</p>
        </div>

        <UserCell user={row.user} large />

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniBox label="Solved" value={row.solvedCount} />
          <MiniBox label="Points" value={row.totalPoints} />
          <MiniBox label="Penalty" value={row.totalPenalty} />
        </div>
      </div>
    </div>
  );
}

function RankBadge({ rank }) {
  if (rank === 1) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/10 px-3 py-1 font-black text-yellow-300">
        <Crown size={15} /> #{rank}
      </span>
    );
  }

  if (rank === 2) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-cyan-300/10 px-3 py-1 font-black text-cyan-200">
        <Medal size={15} /> #{rank}
      </span>
    );
  }

  if (rank === 3) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-orange-400/10 px-3 py-1 font-black text-orange-300">
        <Medal size={15} /> #{rank}
      </span>
    );
  }

  return <span className="font-black text-gray-300">#{rank}</span>;
}

function UserCell({ user, large }) {
  return (
    <div className="flex items-center gap-3">
      {user.profileImage ? (
        <img
          src={user.profileImage}
          alt={user.name || "user"}
          className={`${large ? "h-13 w-13" : "h-10 w-10"} rounded-2xl object-cover`}
        />
      ) : (
        <div
          className={`${large ? "h-13 w-13" : "h-10 w-10"} flex items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20`}
        >
          <User size={large ? 24 : 19} />
        </div>
      )}

      <div className="min-w-0">
        <p
          className={`truncate font-black text-white ${
            large ? "text-xl" : "text-sm"
          }`}
        >
          {user.name || "CodeBit User"}
        </p>
        <p className="truncate text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}

function ProblemStatus({ stat }) {
  if (!stat) {
    return (
      <span className="inline-flex h-9 min-w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-500">
        —
      </span>
    );
  }

  if (stat.solved) {
    return (
      <span className="inline-flex h-9 min-w-12 items-center justify-center gap-1 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 font-black text-emerald-300">
        <CheckCircle2 size={15} />
        {stat.wrongAttempts > 0 ? `+${stat.wrongAttempts}` : "+"}
      </span>
    );
  }

  if (stat.wrongAttempts > 0) {
    return (
      <span className="inline-flex h-9 min-w-12 items-center justify-center gap-1 rounded-xl border border-red-400/20 bg-red-400/10 px-3 font-black text-red-300">
        <XCircle size={15} />-{stat.wrongAttempts}
      </span>
    );
  }

  return (
    <span className="inline-flex h-9 min-w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-500">
      —
    </span>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mb-2 text-cyan-300">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function MiniBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-3 text-center">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 -top-52 h-140 w-240 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />
      <div className="absolute left-10 top-96 h-80 w-80 rounded-full bg-yellow-500/10 blur-[120px]" />
      <div className="absolute right-10 top-60 h-80 w-80 rounded-full bg-emerald-400/10 blur-[120px]" />
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <MainLayout showNavbar={false}>
      <div className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-72 rounded-[2.5rem] border border-white/10 bg-white/5" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-56 rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
          <div className="mt-10 h-96 rounded-[2rem] border border-white/10 bg-white/5" />
        </div>
      </div>
    </MainLayout>
  );
}