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
import { useDispatch } from "react-redux";
import { loadUser } from "../Redux/Features/Auth/authSlice"
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
import axios from "axios";
import defaultAvatar  from "../profile.png"

const DIFFICULTY_COLORS = ["#22c55e", "#eab308", "#ef4444"];


export default function Profile() {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
  });
  const [updating, setUpdating] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const uploadProfileImage = async () => {
  const signatureRes = await axiosClient.get(
    "/user/profileSignature"
  );

  const {
    signature,
    timestamp,
    public_id,
    api_key,
    cloud_name,
    upload_url,
  } = signatureRes.data;

  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("public_id", public_id);
  formData.append("signature", signature);

  // uploading url to cloudinary
  const cloudinaryRes = await axios.post(upload_url, formData);

  return cloudinaryRes.data.public_id;
};

const handleUpdateProfile = async () => {
  try {
    setUpdating(true);

    let updatedUserFromImage = null;

    if (imageFile) {
      const uploadedPublicId = await uploadProfileImage();

      const imageSaveRes = await axiosClient.post(
        "/user/save",
        {
          cloudinaryPublicId: uploadedPublicId,
        }
      );

      updatedUserFromImage = imageSaveRes.data.user;
    }

    const textRes = await axiosClient.put("/user/editProfile", editData);

    setProfile((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...(updatedUserFromImage || {}),
        ...textRes.data.user,
      },
    }));

    setShowEditModal(false);
    setImageFile(null);
    setPreviewImage("");
  } catch (err) {
    console.error("Update profile error:", err);
  } finally {
    setUpdating(false);
  }
};

  const problemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await axiosClient.get("/user/profile");
        // console.log(res);
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Profile Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleDeleteProfile = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to permanently delete your profile?"
  );

  if (!confirmDelete) return;

  try {
    await axiosClient.delete("/user/deleteProfile");

    localStorage.clear();

    window.location.href = "/signup";

  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete profile");
  }
};

const handleRemoveProfileImage = async () => {
  try {
    await axiosClient.delete("/user/deleteImage");

    setPreviewImage("");
    setImageFile(null);

    dispatch(loadUser()); // refresh redux user data

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      err.message ||
      "Failed to remove profile image"
    );
  }
};
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
                      src={user.profileImage || defaultAvatar}
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

              <div className="mt-5 flex w-full gap-3">
                {user.github && (
                  <a
                    href={user.github}
                    target="_blank"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-3 py-3 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <GithubSvg />
                    GitHub
                  </a>
                )}

                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-3 py-3 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <LinkedinSvg />
                    LinkedIn
                  </a>
                )}
              </div>

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

              <button
                onClick={() => {
                  setEditData({
                    name: user.name || "",
                    bio: user.bio || "",
                    github: user.github || "",
                    linkedin: user.linkedin || "",
                  });

                  setPreviewImage(user.profileImage || "");
                  setImageFile(null);
                  setShowEditModal(true);
                }}
                className="mt-5 w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-black transition hover:bg-cyan-300"
              >
                Edit Profile
              </button>

              {showEditModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl">

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                    <p className="mt-1 text-sm text-gray-400">
                      Update your CodeBit profile
                    </p>
                  </div>

                  <div className="mb-5 flex flex-col items-center gap-3">
                    <img
                      src={previewImage || user.profileImage || defaultAvatar}
                      alt="preview"
                      className="h-24 w-24 rounded-full border-2 border-cyan-400/30 object-cover"
                    />

                    <label className="cursor-pointer rounded-xl border border-white/10 bg-white/4 px-4 py-2 text-sm hover:border-cyan-400/40">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          setImageFile(file);
                          setPreviewImage(URL.createObjectURL(file));
                        }}
                      />
                    </label>

                      {user.profileImage && (
                        <button
                          type="button"
                          onClick={handleRemoveProfileImage}
                          className="cursor-pointer rounded-xl border px-4 py-2 border-white/10 text-sm text-red-400 hover:text-red-300 transition"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                        className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none focus:border-cyan-400/50"
                      />

                      <textarea
                        rows={3}
                        placeholder="Bio"
                        value={editData.bio}
                        onChange={(e) =>
                          setEditData({ ...editData, bio: e.target.value })
                        }
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none focus:border-cyan-400/50"
                      />

                      <input
                        type="text"
                        placeholder="GitHub URL"
                        value={editData.github}
                        onChange={(e) =>
                          setEditData({ ...editData, github: e.target.value })
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none focus:border-cyan-400/50"
                      />

                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        value={editData.linkedin}
                        onChange={(e) =>
                          setEditData({ ...editData, linkedin: e.target.value })
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 outline-none focus:border-cyan-400/50"
                      />
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        disabled={updating}
                        onClick={() => {
                          setShowEditModal(false);
                          setImageFile(null);
                          setPreviewImage("");
                        }}
                        className="flex-1 rounded-2xl border border-white/10 bg-white/4 py-3 disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        disabled={updating}
                        onClick={handleUpdateProfile}
                        className="flex-1 rounded-2xl bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-50"
                      >
                        {updating ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
              </div>
                )}
              <div className="mt-10 border border-red-500/20 bg-red-500/5 rounded-2xl p-5">
                  
                  <h2 className="text-lg font-semibold text-red-400">
                    Danger Zone
                  </h2>

                  <p className="text-sm text-gray-400 mt-2">
                    Permanently delete your account and all associated data.
                  </p>

                  <button
                    onClick={handleDeleteProfile}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium transition"
                  >
                    Delete Profile
                  </button>
              </div>

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
                    className="group cursor-pointer rounded-2xl border border-white/10 bg-white/3 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/4"
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

function GithubSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.47.12-3.06 0 0 .98-.31 3.2 1.18A11.1 11.1 0 0 1 12 6.04c.99 0 1.98.13 2.91.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.59.24 2.76.12 3.06.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.3 8h4.4v15H.3V8Zm7.1 0h4.22v2.05h.06c.59-1.11 2.03-2.28 4.18-2.28 4.47 0 5.3 2.94 5.3 6.76V23h-4.4v-7.52c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23h-4.4V8Z" />
    </svg>
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