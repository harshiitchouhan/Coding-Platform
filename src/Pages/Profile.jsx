import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Trophy,
  Target,
  Code2,
  Flame,
  CheckCircle2,
  CalendarDays,
  Activity,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import axiosClient from "@/Utils/axiosClient";
import MainLayout from "./MainLayout";

const DIFFICULTY_COLORS = ["#22c55e", "#eab308", "#ef4444"];


export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const problemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axiosClient.get("/user/profile");
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Profile Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const chartData = useMemo(() => {
    if (!profile) return null;

    const { stats, categoryStats } = profile;

    return {
      difficultyData: [
        { name: "Easy", value: stats.easy || 0 },
        { name: "Medium", value: stats.medium || 0 },
        { name: "Hard", value: stats.hard || 0 },
      ],
      categoryData: Object.entries(categoryStats || {}).map(([name, value]) => ({
        name,
        value,
      })),
    };
  }, [profile]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center text-white">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center text-red-400">
          Failed to load profile
        </div>
      </MainLayout>
    );
  }

  const { user, stats, categoryStats } = profile;

  const solvedProblems = user.problemSolved || [];
  const totalPages = Math.ceil(solvedProblems.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;

  const currentProblems = solvedProblems.slice(
    startIndex,
    startIndex + problemsPerPage
  );

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <MainLayout>
      <section className="min-h-screen px-4 py-24 text-white">
        <div className="mx-auto grid max-w-375 gap-6 xl:grid-cols-[330px_minmax(0,1fr)_390px]">

          {/* LEFT PROFILE */}
          <aside className="h-fit rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-cyan-500/5">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-400/30 bg-slate-900">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={58} className="text-cyan-300" />
                  )}
                </div>

                <div className="absolute bottom-2 right-2 rounded-full bg-cyan-400 p-2 text-black">
                  <CheckCircle2 size={18} />
                </div>
              </div>

              <h1 className="mt-5 text-3xl font-bold">{user.name}</h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <Mail size={15} />
                {user.email}
              </p>

              <span className="mt-4 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm capitalize text-cyan-300">
                {user.role}
              </span>

              <p className="mt-5 text-sm leading-6 text-gray-400">
                {user.bio || "CodeBit learner focused on improving DSA skills."}
              </p>

              <div className="mt-6 grid w-full grid-cols-2 gap-3">
                <ProfileMiniBox label="Solved" value={stats.totalSolved} />
                <ProfileMiniBox icon={<Trophy />} label="CodeBit Score"value={stats.codebitScore}/>
              </div>

              <div className="mt-4 w-full rounded-2xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CalendarDays size={16} />
                  <span className="text-sm">Joined</span>
                </div>
                <p className="mt-1 font-semibold">{joinedDate}</p>
              </div>

              <button className="mt-5 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300">
                Edit Profile
              </button>
            </div>
          </aside>

          {/* CENTER CONTENT */}
          <main className="space-y-6 min-w-0">
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard icon={<Trophy />} label="Problems Solved" value={stats.totalSolved} />
              <StatCard icon={<Target />} label="Acceptance Rate" value={`${stats.acceptanceRate || 0}%`} />
              <StatCard icon={<Code2 />} label="Best Language" value={stats.mostUsedLanguage || "N/A"} />
              <StatCard icon={<Flame />} label="Current Streak" value="Coming Soon" />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Solved Problems</h2>
                  <p className="text-sm text-gray-400">
                    Showing {solvedProblems.length === 0 ? 0 : startIndex + 1}-
                    {Math.min(startIndex + problemsPerPage, solvedProblems.length)} of{" "}
                    {solvedProblems.length}
                  </p>
                </div>

                <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                  {stats.totalSolved} solved
                </span>
              </div>

              <div className="space-y-3">
                {currentProblems.map((problem) => (
                  <div
                    onClick={() => navigate(`/problem/${problem._id}`)}
                    key={problem._id}
                    className="group rounded-2xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold transition group-hover:text-cyan-300">
                          {problem.title}
                        </h3>

                        <p className="mt-1 text-sm capitalize text-gray-400">
                          {problem.category}
                        </p>
                      </div>

                      <DifficultyBadge level={problem.difficultyLevel} />
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:border-cyan-400/40"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`h-9 w-9 rounded-xl text-sm ${
                        currentPage === index + 1
                          ? "bg-cyan-400 font-semibold text-black"
                          : "border border-white/10 bg-white/5 text-gray-300 hover:border-cyan-400/40"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 disabled:cursor-not-allowed disabled:opacity-40 hover:border-cyan-400/40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* RIGHT ANALYTICS */}
          <aside className="space-y-6 min-w-0">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Difficulty Split</h2>
                  <p className="text-sm text-gray-400">Solved by level</p>
                </div>
                <Activity className="text-cyan-300" />
              </div>

              <div className=" w-full min-w-0 overflow-hidden">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={chartData.difficultyData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={85}
                      paddingAngle={5}
                    >
                      {chartData.difficultyData.map((entry, index) => (
                        <Cell key={entry.name} fill={DIFFICULTY_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <MiniStat label="Easy" value={stats.easy} className="text-green-400" />
                <MiniStat label="Medium" value={stats.medium} className="text-yellow-400" />
                <MiniStat label="Hard" value={stats.hard} className="text-red-400" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Strong Zones</h2>
                  <p className="text-sm text-gray-400">Category strength</p>
                </div>
                <BookOpen className="text-cyan-300" />
              </div>

              <div className=" w-full min-w-0 overflow-hidden">
                <ResponsiveContainer width="100%"  height={230}>
                  <BarChart data={chartData.categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#22d3ee" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6">
              <h2 className="text-xl font-semibold">Topic Overview</h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {Object.entries(categoryStats || {}).map(([category, count]) => (
                  <div
                    key={category}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3"
                  >
                    <p className="text-xs capitalize text-gray-300">{category}</p>
                    <p className="text-2xl font-bold text-cyan-300">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </MainLayout>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/90 p-5 transition hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        {icon}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="mt-2 text-2xl font-bold capitalize">{value}</h3>
    </div>
  );
}

function ProfileMiniBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-center">
      <p className="text-2xl font-bold text-cyan-300">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

function MiniStat({ label, value, className }) {
  return (
    <div className="rounded-2xl bg-white/4 p-3 text-center">
      <p className={`text-xl font-bold ${className}`}>{value || 0}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

function DifficultyBadge({ level }) {
  const value = level?.toLowerCase();

  const styles =
    value === "easy"
      ? "bg-green-500/10 text-green-400 border-green-400/20"
      : value === "medium"
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-400/20"
      : "bg-red-500/10 text-red-400 border-red-400/20";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs capitalize ${styles}`}>
      {level}
    </span>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm shadow-xl">
      <p className="capitalize text-gray-300">{label || payload[0].name}</p>
      <p className="font-semibold text-cyan-300">
        {payload[0].value} solved
      </p>
    </div>
  );
}