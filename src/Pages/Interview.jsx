import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import Footer from "../components/layouts/Footer";
import profile from "../profile.png";
import subjects from "./interviewNotes";
import logo from "../assets/CodeBit.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../Redux/Features/Auth/authSlice";

const STORAGE_KEY = "codebit-interview-progress-v1";

const subjectColors = {
  dbms: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  os: "border-sky-400/20 bg-sky-400/10 text-sky-300",
  sql: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  frontend: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  backend: "border-amber-400/20 bg-amber-400/10 text-amber-300",
};

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function ProgressBar({ completed, total }) {
  const percentage = total ? (completed / total) * 100 : 0;

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-cyan-400 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function SectionHeading({ number, title }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-xl font-bold">
      <span className="font-mono text-xs text-cyan-400">{number} /</span>
      {title}
    </h2>
  );
}

function StickyNote({ label, children, variant = "yellow" }) {
  const colors =
    variant === "green"
      ? "bg-[#d8f5e5] text-slate-900"
      : "bg-[#fff0b8] text-slate-900";

  return (
    <aside className={`relative rotate-[-0.5deg] rounded-xl p-6 shadow-[6px_7px_0_rgba(0,0,0,.15)] ${colors}`}>
      <div className="absolute -top-2 left-1/2 h-5 w-20 -translate-x-1/2 rotate-3 bg-white/40" />
      <p className="mb-2 text-xs font-bold uppercase tracking-widest">{label}</p>
      <div className="font-serif text-lg leading-8">{children}</div>
    </aside>
  );
}

function CodeSnippet({ snippet }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(snippet.value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050b16] shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[.035] px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-slate-400">
          {snippet.language}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="text-xs text-cyan-300 transition hover:text-white"
        >
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-7 text-sky-100">
        <code>{snippet.value}</code>
      </pre>
    </div>
  );
}

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user ,isAuthenticated} = useSelector((state)=>state.auth);
    

    const handleLogout = ()=>{
          dispatch(logOut());
          navigate("/login");
   
      }

  return (
    <nav className="relative z-20 border-b border-white/10 bg-[#08111e]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"> 
          <Link to="/">
            <img src={logo} className="h-8 sm:h-10 w-auto object-contain" alt="Codebit logo" />
          </Link>
    

        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <Link to="/" className="hover:text-cyan-300">Home</Link>
          <Link to="/problems" className="hover:text-cyan-300">Problems</Link>
          <Link to="/contests" className="hover:text-cyan-300">Contests</Link>
          <Link to="/interview" className="hover:text-cyan-300">Interview</Link>
          <Link to="/roadmap" className="hover:text-cyan-300">Roadmap</Link>
        </div>

        <div className="flex items-center gap-3">
        <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full hover:bg-white/10 transition">

            <img
              src={isAuthenticated ? (user?.profileImage || profile) : profile}
              alt="profile"
              className="h-8 w-8 rounded-full object-cover border border-white/10"
            />

            <div className="hidden sm:block text-sm font-medium text-white">
              {isAuthenticated ? user?.name : "Guest"}
            </div>

          </div>
        </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white/5 backdrop-blur-md border border-white/10 text-white">
          {isAuthenticated ? (
            <>
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>

              {user?.role === "admin" && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin")}
                  className="text-purple-300 cursor-pointer"
                >
                  Admin Panel
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Login
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate("/signup")}
                className="text-cyan-400 cursor-pointer"
              >
                Signup
              </DropdownMenuItem>
            </>
          )}

        </DropdownMenuContent>

        </DropdownMenu>
          
        </div>
      </div>
    </nav>
  );
}

function HomeView({ progress, onOpenSubject, onOpenTopic }) {
  const [query, setQuery] = useState("");

  const allTopics = useMemo(
    () => subjects.flatMap((subject) =>
      subject.chapters.map((topic) => ({ ...topic, subject }))
    ),
    []
  );

  const completed = allTopics.filter((topic) => progress[topic.id]).length;
  const results = allTopics.filter((topic) =>
    `${topic.title} ${topic.summary} ${topic.subject.name} ${topic.explanation.join(" ")}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <>
      <section className="mb-10 grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="mb-5 inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300">
            THE CODEBIT STUDY DESK
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Understand the <span className="text-cyan-300">why</span> behind every concept.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Interview preparation that feels like a personal notebook. Learn the
            problem first, understand the solution, explore working code, and
            revise with memorable sticky notes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              {subjects.length} subjects
            </span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              {allTopics.length} detailed lessons
            </span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              {completed} completed
            </span>
          </div>
        </div>

        <StickyNote label="Note to self">
          <h2 className="text-2xl font-bold">Don't memorize. Connect the dots.</h2>
          <p className="mt-3">
            When you understand the problem a concept solves, the definition
            becomes easy to remember.
          </p>
          <p className="mt-5 text-right text-xs font-semibold">
            CodeBit Revision Desk
          </p>
        </StickyNote>
      </section>

      <div className="mb-8">
        <label htmlFor="interview-search" className="mb-2 block text-sm text-slate-400">
          Search the handbook
        </label>
        <input
          id="interview-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics, concepts, and explanations..."
          className="w-full rounded-2xl border border-white/10 bg-[#111d2f] px-5 py-4 text-sm outline-none transition focus:border-cyan-400/50"
        />
      </div>

      {query.trim() ? (
        <section>
          <h2 className="mb-5 text-xl font-bold">Search results ({results.length})</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {results.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => onOpenTopic(topic.subject.id, topic.id)}
                className="rounded-2xl border border-white/10 bg-[#111d2f] p-5 text-left transition hover:border-cyan-400/40"
              >
                <span className="text-xs text-cyan-300">{topic.subject.name}</span>
                <h3 className="mt-1 font-bold">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{topic.summary}</p>
              </button>
            ))}
          </div>
          {results.length === 0 && (
            <p className="text-slate-400">No matching notes found.</p>
          )}
        </section>
      ) : (
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
            Explore the library
          </p>
          <h2 className="mb-5 mt-2 text-2xl font-bold">Choose a subject</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const done = subject.chapters.filter((topic) => progress[topic.id]).length;

              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => onOpenSubject(subject.id)}
                  className="group rounded-3xl border border-white/10 bg-[#101c2d]/90 p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <span className={`mb-5 inline-block rounded-xl border px-3 py-2 text-xs font-semibold uppercase ${subjectColors[subject.id] || subjectColors.frontend}`}>
                    Study notes
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-cyan-300">
                    {subject.name}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                    {subject.description}
                  </p>
                  <div className="mt-6 mb-3 flex justify-between text-xs text-slate-400">
                    <span>{subject.chapters.length} lessons</span>
                    <span>{done}/{subject.chapters.length} done</span>
                  </div>
                  <ProgressBar completed={done} total={subject.chapters.length} />
                  <p className="mt-5 text-sm font-semibold text-cyan-300">
                    Open notebook
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

function ChapterSidebar({ subject, topicId, progress, onOpenTopic, onBack }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const completed = subject.chapters.filter((topic) => progress[topic.id]).length;

  function selectTopic(id) {
    onOpenTopic(subject.id, id);
    setMobileOpen(false);
  }

  return (
    <aside>
      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        aria-expanded={mobileOpen}
        className="mb-3 w-full rounded-xl border border-white/10 bg-[#111d2f] p-4 text-left text-sm lg:hidden"
      >
        {mobileOpen ? "Hide chapters" : "Show chapters"}
      </button>

      <div className={`${mobileOpen ? "block" : "hidden"} rounded-3xl border border-white/10 bg-[#101c2d] p-5 lg:sticky lg:top-6 lg:block`}>
        <button
          type="button"
          onClick={onBack}
          className="mb-5 text-xs text-slate-400 hover:text-white"
        >
          All subjects
        </button>
        <h2 className="text-xl font-bold">{subject.name}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {subject.description}
        </p>
        <div className="my-5">
          <ProgressBar completed={completed} total={subject.chapters.length} />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
          Chapter index
        </p>
        <div className="space-y-2">
          {subject.chapters.map((topic, index) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => selectTopic(topic.id)}
              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition ${
                topicId === topic.id
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                  : "border-transparent text-slate-300 hover:bg-white/5"
              }`}
            >
              <span className="mt-0.5 text-xs text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 leading-5">{topic.title}</span>
              {progress[topic.id] && (
                <span className="text-xs text-emerald-300">Done</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function SubjectOverview({ subject, progress, onOpenTopic }) {
  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-[#111d2f] p-7 md:p-9">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-300">
          Subject notebook
        </p>
        <h1 className="text-3xl font-black md:text-4xl">{subject.name}</h1>
        <p className="mt-4 max-w-xl leading-8 text-slate-400">
          {subject.description} Work through the chapters in order or jump
          straight to the concept you want to revise.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {subject.chapters.map((topic, index) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onOpenTopic(subject.id, topic.id)}
            className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-[#111d2f] p-5 text-left transition hover:border-cyan-400/30"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-sm text-cyan-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">
              <span className="block font-semibold">{topic.title}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-400">
                {topic.summary}
              </span>
              <span className="mt-2 block text-xs text-slate-500">
                {topic.time} min read
              </span>
            </span>
            {progress[topic.id] && (
              <span className="text-xs text-emerald-300">Completed</span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}

function LessonView({ topic, subject, progress, onToggleProgress, onOpenTopic, onBack }) {
  const [bookmarks, setBookmarks] = useState({});
  const index = subject.chapters.findIndex((chapter) => chapter.id === topic.id);
  const previous = subject.chapters[index - 1];
  const next = subject.chapters[index + 1];

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#101c2d] p-5 sm:p-8 md:p-10">
      <div className="mb-5 flex flex-wrap items-center gap-3 text-xs">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-300">
          CONCEPT NOTES
        </span>
        <span className="text-slate-400">{topic.time} min read</span>
      </div>

      <h1 className="text-3xl font-black leading-tight md:text-4xl">
        {topic.title}
      </h1>
      <p className="mt-4 text-base leading-8 text-slate-400">{topic.summary}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onToggleProgress(topic.id)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            progress[topic.id]
              ? "bg-emerald-400/15 text-emerald-300"
              : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
          }`}
        >
          {progress[topic.id] ? "Completed" : "Mark as revised"}
        </button>
        <button
          type="button"
          onClick={() => setBookmarks((value) => ({
            ...value,
            [topic.id]: !value[topic.id],
          }))}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
        >
          {bookmarks[topic.id] ? "Bookmarked" : "Bookmark"}
        </button>
      </div>

      <div className="mt-10 space-y-9">
        <section>
          <SectionHeading number="01" title="First, what was the problem?" />
          <p className="leading-8 text-slate-300">{topic.problem}</p>
        </section>

        <section>
          <SectionHeading number="02" title="Why did we need this concept?" />
          <p className="leading-8 text-slate-300">{topic.why}</p>
        </section>

        <StickyNote label="Think of it like this" variant="green">
          {topic.analogy}
        </StickyNote>

        <section>
          <SectionHeading number="03" title="Let's understand how it works" />
          <div className="space-y-4">
            {topic.explanation.map((paragraph, index) => (
              <p key={index} className="leading-8 text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading number="04" title="See it in action" />
          <CodeSnippet snippet={topic.code} />
        </section>

        <section>
          <SectionHeading number="05" title="Follow the flow" />
          <div className="space-y-3">
            {topic.steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/2.5 p-4"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-400/10 text-xs font-bold text-cyan-300">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading number="06" title="Common misunderstandings" />
          <div className="space-y-3">
            {topic.mistakes.map((mistake, index) => (
              <p
                key={index}
                className="rounded-xl border border-rose-400/10 bg-rose-400/5 p-4 text-sm leading-7 text-slate-300"
              >
                {mistake}
              </p>
            ))}
          </div>
        </section>

        <StickyNote label="Sticky revision note">
          <strong>{topic.takeaway}</strong>
        </StickyNote>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        {previous ? (
          <button
            type="button"
            onClick={() => onOpenTopic(subject.id, previous.id)}
            className="text-sm text-slate-300 hover:text-cyan-300"
          >
            Previous: {previous.title}
          </button>
        ) : (
          <span />
        )}

        {next ? (
          <button
            type="button"
            onClick={() => onOpenTopic(subject.id, next.id)}
            className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300"
          >
            Next: {next.title}
          </button>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-cyan-300"
          >
            Back to chapters
          </button>
        )}
      </div>
    </article>
  );
}

export default function Interview() {
  const [subjectId, setSubjectId] = useState(null);
  const [topicId, setTopicId] = useState(null);
  const [progress, setProgress] = useState(readProgress);
  const { user } = useSelector((state) => state.auth);

  const subject = subjects.find((item) => item.id === subjectId);
  const topic = subject?.chapters.find((item) => item.id === topicId);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Browsers may disable local storage.
    }
  }, [progress]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSubject(id) {
    setSubjectId(id);
    setTopicId(null);
    scrollToTop();
  }

  function openTopic(nextSubjectId, nextTopicId) {
    setSubjectId(nextSubjectId);
    setTopicId(nextTopicId);
    scrollToTop();
  }

  function goHome() {
    setSubjectId(null);
    setTopicId(null);
    scrollToTop();
  }

  function toggleProgress(id) {
    setProgress((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 selection:bg-cyan-400/30">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(8,145,178,.12),transparent_45%),linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-size-[auto,36px_36px,36px_36px]" />

      <Navbar user={user} />

      <main className="relative mx-auto max-w-7xl px-5 pb-24 pt-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <button type="button" onClick={goHome} className="hover:text-cyan-300">
            Interview Handbook
          </button>
          {subject && (
            <>
              <span>/</span>
              <button
                type="button"
                onClick={() => openSubject(subject.id)}
                className="hover:text-cyan-300"
              >
                {subject.name}
              </button>
            </>
          )}
          {topic && (
            <>
              <span>/</span>
              <span className="text-cyan-300">{topic.title}</span>
            </>
          )}
        </nav>

        {!subject ? (
          <HomeView
            progress={progress}
            onOpenSubject={openSubject}
            onOpenTopic={openTopic}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
            <ChapterSidebar
              key={subject.id}
              subject={subject}
              topicId={topicId}
              progress={progress}
              onOpenTopic={openTopic}
              onBack={goHome}
            />
            <div>
              {topic ? (
                <LessonView
                  topic={topic}
                  subject={subject}
                  progress={progress}
                  onToggleProgress={toggleProgress}
                  onOpenTopic={openTopic}
                  onBack={() => openSubject(subject.id)}
                />
              ) : (
                <SubjectOverview
                  subject={subject}
                  progress={progress}
                  onOpenTopic={openTopic}
                />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
