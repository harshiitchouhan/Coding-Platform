import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import axiosClient from "../Utils/axiosClient";
import { useDispatch } from "react-redux";
import { loadUser } from "../Redux/Features/Auth/authSlice";
import { MailCheck, ShieldCheck } from "lucide-react";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleVerify(e) {
    e.preventDefault();

    if (!email) {
      setError("Email not found. Please signup again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axiosClient.post("/user/verify-email", {
        email,
        otp,
      });

      await dispatch(loadUser());
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-dvh w-full bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(99, 102, 241, 0.12), transparent 60%), #000000",
        }}
      />

      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_45%)]" />

      <main className="relative z-10 min-h-dvh flex items-center justify-center px-4 py-6">
        <form
          onSubmit={handleVerify}
          className="w-full max-w-md rounded-2xl p-7 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white"
        >
          <div className="flex justify-center mb-5">
            <div className="h-16 w-16 rounded-2xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.25)]">
              <MailCheck className="h-8 w-8 text-cyan-300" />
            </div>
          </div>

          <div className="text-center space-y-2 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Verify Email
            </h1>

            <p className="text-sm text-gray-300 wrap-break-words">
              OTP sent to{" "}
              <span className="text-cyan-300 font-medium">
                {email || "your email"}
              </span>
            </p>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <div className="relative mb-5">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter 6 digit OTP"
              className="w-full h-12 px-4 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20 tracking-[0.35em] text-center"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 bg-white/5 p-1.5 rounded-md">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6 || !email}
            className="w-full h-12 text-lg rounded-lg bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-center text-sm text-gray-300 mt-5">
            Wrong email?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
              Signup again
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}