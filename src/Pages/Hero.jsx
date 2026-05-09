import { Link } from "react-router";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Brain,
  Trophy,
  Clock,
} from "lucide-react";

export default function Hero() {
  const stats = [
    { value: "500+", label: "DSA Problems", icon: Code2 },
    { value: "3", label: "Languages", icon: Brain },
    { value: "AI", label: "BitMentor Support", icon: Sparkles },
    { value: "24/7", label: "Practice Anytime", icon: Clock },
  ];

  const companies = [
    "Google",
    "Amazon",
    "Netflix",
    "Accenture",
    "Coforge",
    "Mahindra",
  ];

  const steps = [
    {
      title: "Pick a Topic",
      text: "Arrays, Graphs, Trees, DP and more",
    },
    {
      title: "Solve Problems",
      text: "Practice real interview questions",
    },
    {
      title: "Track Progress",
      text: "Improve step by step with insights",
    },
  ];

  return (
    <>
      {/* HERO */}
        <section className="relative z-20 min-h-screen overflow-hidden px-6 pt-8 md:px-16">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.14),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.75))]" />

        {/* Floating glow orbs */}
        <div className="absolute left-20 top-36 h-28 w-28 rounded-full bg-cyan-400/20 blur-3xl animate-float-slow" />
        <div className="absolute right-24 top-44 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl animate-float" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT */}
            <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                <Sparkles size={16} />
                Built for future developers
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[4.8rem]">               
                    Master DSA by Practicing
                <div className="relative  h-20.5 overflow-hidden sm:h-24 md:h-28 lg:h-23 xl:h-25">
                <div className="absolute left-0 top-0 flex flex-col animate-hero-words">
                    {[
                    "Real Problems",
                    "Interview Qns",
                    "Coding Rounds",
                    "Industry Probs",
                    "Smart Challenge",
                    ].map((text, index) => (
                    <div
                        key={index}
                        className="flex h-20.5 items-center whitespace-nowrap bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent sm:h-24 md:h-28 lg:h-23 xl:h-25"
                    >
                        {text}
                    </div>
                    ))}
                </div>
                </div>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Practice real interview-level problems, improve problem-solving skills,
                track progress, and become placement ready with CodeBit.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
                <Link
                to="/problems"
                className="group rounded-full bg-cyan-300 px-7 py-3 font-bold text-black shadow-[0_0_35px_rgba(34,211,238,0.35)] transition hover:-translate-y-1 hover:bg-cyan-200"
                >
                Explore Problems
                <ArrowRight
                    className="ml-2 inline transition group-hover:translate-x-1"
                    size={18}
                />
                </Link>

                <Link
                to="/interview"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10"
                >
                Practice Interview
                </Link>
            </div>

            </div>

            {/* RIGHT */}
            <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[2.2rem] bg-cyan-400/20 blur-3xl animate-pulse" />

            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-white/[0.07] p-5 shadow-[0_30px_100px_rgba(34,211,238,0.16)] backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/60 to-transparent" />

                <div className="rounded-2xl border border-white/10 bg-black/70 p-5">
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>

                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                    CodeBit.js
                    </span>
                </div>

                <pre className="overflow-hidden text-sm leading-7 text-slate-300 md:text-base">
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

                <div className="mt-5 grid grid-cols-2 gap-4">
                {stats.map((item, index) => (
                    <div
                    key={index}
                    className="group rounded-2xl border border-white/10 bg-black/40 p-5 text-center transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/5"
                    >
                    <h3 className="text-3xl font-black text-cyan-300">
                        {item.value}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </section>

      {/* COMPANIES */}
      <section className="relative z-10 px-6 md:px-16 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Practice with Real Interview Questions From
          </h2>

          <div className="mt-12 flex flex-wrap justify-center gap-x-14 gap-y-7 text-xl md:text-3xl font-semibold text-white/80">
            {companies.map((company, index) => (
              <span
                key={index}
                className="cursor-pointer transition duration-300 hover:bg-linear-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-6 md:px-16 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
              <Trophy className="text-cyan-300" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold">
              How CodeBit Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              A simple path from choosing a topic to solving problems and
              tracking your growth.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-300/30"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl transition group-hover:bg-cyan-400/20" />

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-lg font-bold text-cyan-300">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-bold text-cyan-300">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
        <div className="mt-24 px-6 md:px-16 mb-24 text-white">

                <div className="max-w-4xl mx-auto text-center p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.05] hover:border-cyan-400/40 
                                hover:shadow-[0_10px_40px_rgba(56,189,248,0.25)]">

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-semibold">
                    Ready to crack your dream company? 
                    </h2>

                    {/* Hinglish Line */}
                    <p className="text-gray-400 mt-4 text-lg">
                    Offer chahiye Google, Amazon jaisi companies se?  
                    Toh ab sirf dekhna band karo — practice shuru karo aur apna DSA solid banao 
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                    <Link
                        to="/problems"
                        className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold 
                        hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    >
                         Start Solving
                    </Link>

                    </div>

                </div>

            </div>
      
    </>
  );
}