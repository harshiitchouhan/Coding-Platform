import { useState } from "react";
import { toast } from "sonner";
import axiosClient from "../Utils/axiosClient";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      setLoading(true);

      const res = await axiosClient.post(
        "/user/forget-password",
        { email }
      );

      toast.success("Password Reset Link is Succesfully Sent ");
      setEmail("");

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden">

      {/* X-style top glow background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(99, 102, 241, 0.12), transparent 60%), #000000",
        }}
      />

      {/* Soft floating blur layer */}
      <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_45%)]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <div
          className="w-full max-w-md rounded-2xl p-8
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl text-white"
        >
          {/* Heading */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Forgot Password
            </h1>

            <p className="text-sm text-gray-300">
              Enter your email address and we'll send you a password reset link.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-sky-400 placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-sky-500 hover:bg-sky-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center text-sm font font-medium text-gray-300">
                <span className="">Back to </span>
                
                <Link to="/login" className="text-blue-500 hover:text-blue-300 font-medium transition">
                  Login
                </Link>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;