import { Link } from "react-router";
import {
  Code2,
  Sparkles,
  Trophy,
  Brain,
  Rocket,
  ShieldCheck,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Footer from "./Footer";

export default function About() {
  const stats = [
    { value: "500+", label: "DSA Problems" },
    { value: "3", label: "Languages" },
    { value: "AI", label: "BitMentor Support" },
    { value: "24/7", label: "Practice Anytime" },
  ];



  const features = [
    {
      icon: Brain,
      title: "AI Powered Learning",
      desc: "BitMentor helps users understand logic, debug code, and improve step by step.",
    },
    {
      icon: Code2,
      title: "Real Coding Experience",
      desc: "Practice with a powerful editor, test cases, submissions, and instant feedback.",
    },
    {
      icon: Trophy,
      title: "Track Your Progress",
      desc: "Solved problems, streaks, submissions, and performance insights in one place.",
    },
    {
      icon: ShieldCheck,
      title: "Admin Controlled Quality",
      desc: "Every problem can be validated with test cases before becoming live.",
    },
  ];

  const timeline = [
    "Choose a problem based on topic or difficulty",
    "Write code in C++, Java, or JavaScript",
    "Run visible test cases instantly",
    "Submit against hidden test cases",
    "Learn from editorials and AI guidance",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.16),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),#000)]" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 border border-cyan-300/30">
              <Code2 className="text-cyan-300" size={22} />
            </div>
            <span className="text-xl font-bold tracking-wide">
              Code<span className="text-cyan-300">Bit</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
            <Link to="/problems" className="hover:text-cyan-300 transition">Problems</Link>
            <Link to="/interview" className="hover:text-cyan-300 transition">Interview</Link>
          </div>

          <Link
            to="/problems"
            className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black hover:bg-cyan-300 transition shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          >
            Start Coding
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200 animate-pulse">
              <Sparkles size={16} />
              Built for future developers
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              About{" "}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                CodeBit
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              CodeBit is a modern coding platform designed to help students
              master DSA, improve problem-solving skills, prepare for
              placements, and learn with real-time feedback.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/problems"
                className="group rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-cyan-200 transition"
              >
                Explore Problems
                <ArrowRight className="ml-2 inline group-hover:translate-x-1 transition" size={18} />
              </Link>

              <Link
                to="/interview"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Practice Interview
              </Link>
            </div>
          </div>

          {/* Floating Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/20 blur-3xl animate-pulse" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-2xl">
              <div className="rounded-2xl bg-black/70 border border-white/10 p-5">
                <div className="flex gap-2 mb-5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <pre className="text-sm md:text-base text-slate-300 leading-7 overflow-hidden">
                  {`class CodeBit {
                    constructor() {
                      this.goal = "Master DSA";
                      this.power = "Practice + AI";
                    }

                    startJourney() {
                      return "Placement Ready";
                    }
                  }`}
                                  </pre>
                                </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center hover:-translate-y-1 hover:border-cyan-300/40 transition"
                  >
                    <h3 className="text-2xl font-bold text-cyan-300">{item.value}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why CodeBit Exists?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            CodeBit is not just a problem list. It is a complete learning
            environment where practice, feedback, editorials, AI help, and
            progress tracking come together.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-cyan-300/8"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-cyan-300/10 border border-cyan-300/20 group-hover:scale-110 transition">
                  <Icon className="text-cyan-300" size={26} />
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-slate-300">
              <Rocket size={16} className="text-cyan-300" />
              Your coding journey
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold">
              From beginner to confident problem solver.
            </h2>

            <p className="mt-5 text-slate-400 leading-7">
              CodeBit is made for students who want a clear path. You practice,
              test, submit, learn from mistakes, and improve every single day.
            </p>

            <div className="mt-8 space-y-4">
              {timeline.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/4 p-4 hover:bg-white/8 transition"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-300 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="text-cyan-300" />
              What makes CodeBit different?
            </h3>

            <div className="space-y-5">
              {[
                "Clean and modern problem-solving interface",
                "Visible and hidden test case support",
                "AI assistant for DSA-focused help",
                "Editorial videos and explanation support",
                "Admin problem validation before publishing",
                "Profile, streaks, acceptance rate, and progress tracking",
              ].map((point, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="mt-1 text-cyan-300 shrink-0" size={20} />
                  <p className="text-slate-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-linear-to-r from-cyan-300/10 via-white/4 to-sky-500/10 p-10 md:p-14 text-center">
          <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative">
            <Users className="mx-auto mb-5 text-cyan-300" size={42} />

            <h2 className="text-4xl md:text-5xl font-black">
              Ready to level up your coding?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Start solving problems, build consistency, improve logic, and
              become placement ready with CodeBit.
            </p>

            <Link
              to="/problems"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-7 py-3 font-bold text-black hover:bg-cyan-200 transition shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              Start Practicing
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}