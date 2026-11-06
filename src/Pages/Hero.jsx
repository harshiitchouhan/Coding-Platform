import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerClass = "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10";

const stats = [
  { value: "500+", label: "DSA Problems" },
  { value: "3", label: "Languages" },
  { value: "AI", label: "BitMentor Support" },
  { value: "24/7", label: "Practice Anytime" },
];

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Adobe",
  "NVIDIA",
  "Uber",
  "Atlassian",
  "Salesforce",
  "Oracle",
  "Cisco",
  "IBM",
  "Samsung",
  "Flipkart",
  "Walmart Global Tech",
  "Accenture",
  "Deloitte",
  "Goldman Sachs",
  "JPMorgan Chase",
  "Infosys",
  "TCS",
  "Zoho",
  "Swiggy",
  "Zomato",
];

const steps = [
  {
    title: "Pick a Topic",
    text: "Start with Arrays, Graphs, Trees, Dynamic Programming, and more.",
  },
  {
    title: "Solve Problems",
    text: "Build confidence through coding practice and interview-focused challenges.",
  },
  {
    title: "Track Progress",
    text: "See what you've learned and move forward with a clearer plan.",
  },
];

function CompanyTrack({ duplicate = false }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {companies.map((company) => (
        <span
          key={company}
          className="shrink-0 whitespace-nowrap rounded-2xl border border-white/10 bg-white/4.5 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-lg transition-colors duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.07] hover:text-cyan-200 sm:px-7 sm:py-4 sm:text-base"
        >
          {company}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? false : { opacity: 0, y: 18 };
  const revealAnimate = { opacity: 1, y: 0 };

  return (
    <>
      {/* Continuous company marquee and the original vertically rotating hero words. */}
      <style>{`
        @keyframes codebit-hero-rotate {
          0%, 11% { transform: translateY(0); }
          17%, 28% { transform: translateY(-16.666667%); }
          34%, 45% { transform: translateY(-33.333333%); }
          51%, 62% { transform: translateY(-50%); }
          68%, 79% { transform: translateY(-66.666667%); }
          85%, 100% { transform: translateY(-83.333333%); }
        }

        .codebit-hero-words {
          animation: codebit-hero-rotate 15s ease-in-out infinite;
          will-change: transform;
        }

        .codebit-hero-word {
          height: 1.18em;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        @keyframes codebit-company-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .codebit-company-track {
          animation: codebit-company-scroll 48s linear infinite;
          will-change: transform;
        }

        .codebit-company-marquee:hover .codebit-company-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .codebit-hero-words {
            animation: none;
            will-change: auto;
          }

          .codebit-hero-word:not(:first-child) {
            display: none;
          }

          .codebit-company-track {
            animation: none;
            will-change: auto;
          }

          .codebit-company-marquee {
            overflow-x: auto;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(14,165,233,0.14),transparent_35%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.75))]"
        />

        <div className={`${containerClass} relative z-10`}>
          <div className="grid min-w-0 items-center gap-12 py-16 sm:py-20 lg:min-h-165 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-24">
            {/* HERO TEXT */}
            <motion.div
              className="min-w-0"
              initial={revealInitial}
              animate={revealAnimate}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <p className="mb-6 inline-flex max-w-full items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-medium tracking-wide text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)] sm:text-sm">
                Built for future developers
              </p>

              {/* Restore the original vertical swipe / flipping-word headline. */}
              <h1 className="max-w-3xl text-[clamp(2rem,5vw,4.2rem)] font-black leading-[1.1] tracking-[-0.045em] text-white">
                Master DSA by Practicing
                <span className="relative mt-1 block h-[1.18em] overflow-hidden" aria-label="Real Problems, Interview Qns, Coding Rounds, Industry Probs, Smart Challenge">
                  <span className="codebit-hero-words absolute inset-x-0 top-0 flex flex-col" aria-hidden="true">
                    {[
                      "Real Problems",
                      "Interview Qns",
                      "Coding Rounds",
                      "Industry Probs",
                      "Smart Challenge",
                      "Real Problems",
                    ].map((word, index) => (
                      <span
                        key={`${word}-${index}`}
                        className="codebit-hero-word bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent"
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Practice real interview-level problems, sharpen your problem-solving,
                and become placement-ready with CodeBit.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  to="/problems"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(34,211,238,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 sm:w-auto sm:text-base"
                >
                  Explore Problems
                  <ArrowRight
                    aria-hidden="true"
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/interview"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto sm:text-base"
                >
                  Explore Revision Hub
                </Link>
              </div>
            </motion.div>

            {/* EXISTING CODE DISPLAY — RESPONSIVE */}
            <motion.div
              className="relative mx-auto w-full min-w-0 max-w-xl"
              initial={revealInitial}
              animate={revealAnimate}
              transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-cyan-400/15 blur-3xl sm:-inset-6"
              />

              <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-white/[0.07] p-3 shadow-[0_30px_100px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/60 to-transparent"
                />

                <div className="min-w-0 rounded-xl border border-white/10 bg-black/70 p-4 sm:rounded-2xl sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
                    <div className="flex gap-1.5 sm:gap-2" aria-hidden="true">
                      <span className="size-2.5 rounded-full bg-red-400 sm:size-3" />
                      <span className="size-2.5 rounded-full bg-yellow-400 sm:size-3" />
                      <span className="size-2.5 rounded-full bg-green-400 sm:size-3" />
                    </div>

                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] text-cyan-200 sm:text-xs">
                      CodeBit.js
                    </span>
                  </div>

                  <pre className="max-w-full overflow-x-auto pb-1 text-[11px] leading-5 text-slate-300 sm:text-sm sm:leading-6 lg:text-[13px]">
                    <code>{`class CodeBit {
  constructor() {
    this.goal = "Master DSA";
    this.power = "Practice + AI";
  }

  startJourney() {
    return "Placement Ready";
  }
}`}</code>
                  </pre>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-4">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="min-w-0 rounded-xl border border-white/10 bg-black/40 px-2 py-3 text-center transition-colors duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/5 sm:rounded-2xl sm:p-5"
                    >
                      <h3 className="text-xl font-black text-cyan-300 sm:text-3xl">
                        {item.value}
                      </h3>
                      <p className="mt-1 text-[11px] leading-4 text-slate-400 sm:text-sm sm:leading-5">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPANY MARQUEE — CENTERED */}
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className={containerClass}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm">
              Interview preparation
            </p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Practice for interviews at companies like
            </h2>
          </div>

          <div
            className="codebit-company-marquee relative mx-auto mt-9 w-full max-w-5xl overflow-hidden sm:mt-12"
            aria-label="Companies"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-black to-transparent sm:w-20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-black to-transparent sm:w-20"
            />

            <div className="codebit-company-track flex w-max items-center">
              <CompanyTrack />
              <CompanyTrack duplicate />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-14 text-white sm:py-20">
        <div className={containerClass}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How CodeBit Works
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              A simple path from choosing a topic to solving problems and tracking
              your growth.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
                className="group relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-300/30 sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-cyan-400/10 blur-2xl"
                />
                <div className="mb-6 flex size-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-lg font-bold text-cyan-300 sm:size-12">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-cyan-300 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAPS + REVISION HUB */}
      <section className="relative overflow-hidden py-14 text-white sm:py-20">
        <div className={containerClass}>
          <motion.div
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-9 max-w-3xl sm:mb-12"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm">
              Learn with direction
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              A clear path forward. A faster way to revise.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Practice is only one part of progress. Follow a structured roadmap,
              then revisit the fundamentals whenever you need clarity.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            {/* Roadmaps */}
            <motion.article
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-white/4.5 p-5 backdrop-blur-xl sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-cyan-400/10 blur-3xl"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.17em] text-cyan-300">
                  01 / Roadmaps
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300 sm:text-xs">
                  Curated + Custom
                </span>
              </div>
              <h3 className="relative mt-7 max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
                Know exactly what to learn next.
              </h3>
              <p className="relative mt-3 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                Explore curated DSA paths or create your own roadmap, connect
                topics, and keep moving at your pace.
              </p>

              <div className="relative mt-7 flex-1 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold tracking-wide text-slate-300">
                    DSA learning path
                  </p>
                  <span className="text-[11px] text-cyan-300">Your pace, your path</span>
                </div>
                <div className="space-y-3">
                  {[
                    { step: "01", title: "Foundations", detail: "Math + Complexity", active: true },
                    { step: "02", title: "Arrays & Strings", detail: "Core Patterns", active: false },
                    { step: "03", title: "Trees & Graphs", detail: "Problem Solving", active: false },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 sm:p-4 ${
                        item.active
                          ? "border-cyan-300/30 bg-cyan-300/7.5"
                          : "border-white/[0.07] bg-white/2.5"
                      }`}
                    >
                      <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${item.active ? "bg-cyan-300/15 text-cyan-200" : "bg-white/5 text-slate-400"}`}>
                        {item.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.detail}</p>
                      </div>
                      <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${item.active ? "bg-cyan-300" : "bg-white/20"}`} />
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/roadmap"
                className="relative mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-cyan-200 transition-all hover:border-cyan-300/50 hover:bg-cyan-300/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                Explore Roadmaps
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.article>

            {/* Revision Hub: notes and concepts, not mock interviews. */}
            <motion.article
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1 }}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-blue-300/20 bg-white/4.5 p-5 backdrop-blur-xl sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-blue-500/10 blur-3xl"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.17em] text-sky-300">
                  02 / Revision Hub
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300 sm:text-xs">
                  Concept Notes
                </span>
              </div>
              <h3 className="relative mt-7 max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
                Remember the why, not just the answer.
              </h3>
              <p className="relative mt-3 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                Refresh the CS concepts behind your code with easy-to-scan notes
                for DBMS, OS, SQL, frontend, and backend fundamentals.
              </p>

              <div className="relative mt-7 flex-1 rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  {["DBMS", "OS", "SQL", "Frontend", "Backend"].map((topic, index) => (
                    <span
                      key={topic}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                        index === 0
                          ? "border-sky-300/35 bg-sky-300/10 text-sky-200"
                          : "border-white/10 bg-white/4 text-slate-400"
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/2.5 p-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-300">
                    Topic preview / DBMS
                  </p>
                  <h4 className="text-base font-semibold text-white sm:text-lg">
                    ACID Properties
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Understand why database transactions need atomicity,
                    consistency, isolation, and durability.
                  </p>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Short notes. Clear explanations. Quick recall.
                </p>
              </div>

              <Link
                to="/interview"
                className="relative mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-2.5 text-sm font-semibold text-sky-200 transition-all hover:border-sky-300/50 hover:bg-sky-300/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
              >
                Open Revision Hub
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.article>
          </div>
        </div>
      </section>

      {/* STANDALONE BRAND STATEMENT — no longer the hero headline */}
      <section className="relative isolate overflow-hidden py-16 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(34,211,238,0.12),transparent_60%)]"
        />
        <div className={containerClass}>
          <motion.div
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.035] px-5 py-14 text-center shadow-[0_25px_90px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:px-10 sm:py-20 lg:py-24"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-5 size-32 rounded-3xl border border-cyan-300/10 bg-cyan-300/3 rotate-[-15deg] sm:size-48" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-12 bottom-5 size-32 rounded-3xl border border-blue-300/10 bg-blue-300/3 rotate-17 sm:size-48" />
            <p className="relative mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm">
              The CodeBit mindset
            </p>
            <h2 className="relative mx-auto max-w-4xl text-[clamp(2rem,5.4vw,4.6rem)] font-black leading-[1.12] tracking-[-0.045em]">
              <span className="block">Code is the output.</span>
              <span className="mt-2 block bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Thinking is the skill.
              </span>
            </h2>
            <p className="relative mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-lg sm:leading-8">
              It's not about memorizing a solution. It's about learning how to
              break a problem down, reason through it, and build with confidence.
            </p>
            <div className="relative mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-2 sm:mt-11 sm:gap-3" aria-label="The problem-solving process">
              {["Understand", "Break Down", "Solve", "Improve"].map((step, index) => (
                <span
                  key={step}
                  className={`rounded-full border px-4 py-2 text-xs font-medium sm:px-5 sm:text-sm ${
                    index === 2
                      ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200"
                      : "border-white/10 bg-white/4.5 text-slate-300"
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-16 pt-10 text-white sm:pb-24 sm:pt-14">
        <div className={containerClass}>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-11 text-center backdrop-blur-xl sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-1/4 -bottom-24 h-36 rounded-full bg-cyan-400/10 blur-3xl"
            />

            <h2 className="relative text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to crack your dream company?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Consistent practice makes the difference. Build your DSA skills,
              strengthen your fundamentals, and take the next step with CodeBit.
            </p>

            <Link
              to="/problems"
              className="relative mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-300 px-7 py-3 font-semibold text-black shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-colors duration-300 hover:bg-cyan-200 sm:w-auto"
            >
              Start Solving
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
