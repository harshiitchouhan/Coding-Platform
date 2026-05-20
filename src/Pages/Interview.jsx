import { useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Brain,
  Code2,
  Server,
  LayoutGrid,
  Puzzle,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Footer from "../components/layouts/Footer";
import profile from "../profile.png"

const questions = [
  {
    category: "JavaScript",
    level: "Easy",
    q: "What is the difference between var, let, and const?",
    a: "var is function-scoped, let and const are block-scoped. const cannot be reassigned.",
  },
  {
    category: "JavaScript",
    level: "Medium",
    q: "Explain closures in JavaScript.",
    a: "A closure is when a function remembers variables from its outer scope even after that outer function has finished executing.",
  },
  {
    category: "JavaScript",
    level: "Medium",
    q: "What is event delegation?",
    a: "Instead of adding listeners to many child elements, we add one listener to the parent and handle events using event.target.",
  },
  {
    category: "JavaScript",
    level: "Hard",
    q: "Difference between call, apply, and bind?",
    a: "call invokes immediately with arguments one by one, apply uses an array, bind returns a new function.",
  },
  {
    category: "React",
    level: "Easy",
    q: "What is JSX?",
    a: "JSX lets us write HTML-like syntax inside JavaScript. React converts it into React elements.",
  },
  {
    category: "React",
    level: "Medium",
    q: "Why do we use useEffect?",
    a: "useEffect handles side effects like API calls, subscriptions, timers, and DOM updates.",
  },
  {
    category: "React",
    level: "Medium",
    q: "What is state lifting?",
    a: "Moving state to a common parent so multiple child components can share and update the same data.",
  },
  {
    category: "React",
    level: "Hard",
    q: "What causes unnecessary re-renders in React?",
    a: "Changing parent state, passing new object/function references, missing memoization, or poor component splitting.",
  },
  {
    category: "CSS Flexbox",
    level: "Easy",
    q: "What is the difference between justify-content and align-items?",
    a: "justify-content aligns items on the main axis, align-items aligns items on the cross axis.",
  },
  {
    category: "CSS Flexbox",
    level: "Medium",
    q: "How do you center a div using flexbox?",
    a: "Use display:flex, justify-content:center, align-items:center.",
  },
  {
    category: "CSS Flexbox",
    level: "Medium",
    q: "What does flex-wrap do?",
    a: "It allows flex items to move to the next line when there is not enough space.",
  },
  {
    category: "CSS Grid",
    level: "Easy",
    q: "What is CSS Grid used for?",
    a: "CSS Grid is used for creating two-dimensional layouts with rows and columns.",
  },
  {
    category: "CSS Grid",
    level: "Medium",
    q: "Difference between grid-template-columns and grid-template-rows?",
    a: "grid-template-columns defines column layout, grid-template-rows defines row layout.",
  },
  {
    category: "CSS Grid",
    level: "Hard",
    q: "What does repeat(auto-fit, minmax(250px, 1fr)) do?",
    a: "It creates responsive columns that automatically fit available space with minimum width 250px.",
  },
  {
    category: "Backend",
    level: "Easy",
    q: "What is an API?",
    a: "An API allows frontend and backend to communicate using requests and responses.",
  },
  {
    category: "Backend",
    level: "Medium",
    q: "Difference between authentication and authorization?",
    a: "Authentication checks who the user is. Authorization checks what the user is allowed to access.",
  },
  {
    category: "Backend",
    level: "Medium",
    q: "What are JWT tokens?",
    a: "JWT tokens store signed user information and are commonly used for authentication.",
  },
  {
    category: "Backend",
    level: "Hard",
    q: "Why do we use middleware in Express?",
    a: "Middleware runs between request and response. It is used for auth, validation, logging, error handling, etc.",
  },
  {
    category: "MongoDB",
    level: "Easy",
    q: "What is MongoDB?",
    a: "MongoDB is a NoSQL database that stores data in document format similar to JSON.",
  },
  {
    category: "MongoDB",
    level: "Medium",
    q: "What is the difference between findOne and find?",
    a: "findOne returns one document, find returns an array of matching documents.",
  },
  {
    category: "MongoDB",
    level: "Hard",
    q: "What is populate in Mongoose?",
    a: "populate replaces referenced ObjectIds with actual documents from another collection.",
  },
  {
    category: "Puzzle",
    level: "Easy",
    q: "You have 3 switches outside a room and 3 bulbs inside. You can enter the room only once. How will you find which switch controls which bulb?",
    a: "Turn on switch 1 for some time, turn it off, turn on switch 2, then enter. Glowing bulb is switch 2, warm bulb is switch 1, cold bulb is switch 3.",
  },
  {
    category: "Puzzle",
    level: "Medium",
    q: "A bat and ball cost ₹110 total. Bat costs ₹100 more than ball. What is the cost of the ball?",
    a: "The ball costs ₹5 and the bat costs ₹105.",
  },
  {
    category: "Puzzle",
    level: "Medium",
    q: "You have two ropes. Each rope burns completely in 60 minutes, but unevenly. How will you measure 45 minutes?",
    a: "Light rope 1 from both ends and rope 2 from one end. When rope 1 finishes after 30 min, light other end of rope 2. It finishes in 15 more min.",
  },
  {
    category: "DSA",
    level: "Easy",
    q: "What is the time complexity of binary search?",
    a: "O(log n), because the search space is divided into half each time.",
  },
  {
    category: "DSA",
    level: "Medium",
    q: "Difference between stack and queue?",
    a: "Stack follows LIFO. Queue follows FIFO.",
  },
  {
    category: "DSA",
    level: "Hard",
    q: "Why is hashing useful?",
    a: "Hashing gives average O(1) lookup, insert, and delete, useful for frequency count and duplicate checking.",
  },
];

const categories = [
  "All",
  "JavaScript",
  "React",
  "CSS Flexbox",
  "CSS Grid",
  "Backend",
  "MongoDB",
  "Puzzle",
  "DSA",
];

function getIcon(category) {
  if (category.includes("CSS")) return <LayoutGrid size={18} />;
  if (category === "Backend" || category === "MongoDB") return <Server size={18} />;
  if (category === "Puzzle") return <Puzzle size={18} />;
  if (category === "React") return <Sparkles size={18} />;
  return <Code2 size={18} />;
}

export default function Interview() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const {user} = useSelector((state)=>state.auth);

  const filteredQuestions = questions.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-125 w-175 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-100 w-125 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[60px_60px]" />
      </div>

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
            <Link to="/contests" className="hover:text-cyan-300 transition">Contests</Link>
            <Link to="/interview" className="hover:text-cyan-300 transition">Interview</Link>
          </div>

          <div className="cursor-pointer flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full hover:bg-white/10 transition">
              
              <img
                src={user?.profileImage || profile}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border border-white/10"
              />

              <div className="hidden sm:block text-sm font-medium">
                {user?.name}
              </div>
            </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Sparkles size={16} />
              Prepare smarter for technical interviews
            </div>

            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Crack Interviews With{" "}
              <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                Real Questions
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-gray-400 text-lg leading-relaxed">
              Practice JavaScript, React, CSS Flexbox, Grid, Backend, MongoDB,
              DSA and puzzle-based interview questions — all in one beautiful
              place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={"/problems"}>
              <button className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20">
                Start Practice
              </button>
              </Link>
              <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-gray-200 hover:bg-white/10 transition">
                {questions.length}+ Questions
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl shadow-2xl">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="space-y-4">
              {["JavaScript", "React", "Backend", "Puzzle"].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      {getIcon(item)}
                    </div>
                    <div>
                      <p className="font-semibold">{item}</p>
                      <p className="text-xs text-gray-400">
                        Interview ready questions
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-cyan-300 font-semibold">
                    {i + 5} Qs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 pb-20">
        {/* Search + Filters */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search interview questions..."
              className="w-full rounded-2xl border border-white/10 bg-[#020617]/80 py-3 pl-12 pr-4 text-sm outline-none focus:border-cyan-400/50"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-cyan-400 text-black"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="grid gap-5 md:grid-cols-2">
          {filteredQuestions.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-[#0f172a]/70 p-5 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-[#0f172a]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    {getIcon(item.category)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-cyan-300">
                      {item.category}
                    </p>
                    <p className="text-xs text-gray-500">Question #{index + 1}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.level === "Easy"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : item.level === "Medium"
                      ? "bg-yellow-400/10 text-yellow-300"
                      : "bg-red-400/10 text-red-300"
                  }`}
                >
                  {item.level}
                </span>
              </div>

              <h3 className="text-lg font-bold leading-snug text-white">
                {item.q}
              </h3>

              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition"
              >
                {openIndex === index ? (
                  <>
                    Hide Answer <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    View Answer <ChevronDown size={16} />
                  </>
                )}
              </button>

              {openIndex === index && (
                <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-relaxed text-gray-300">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/4 p-10 text-center text-gray-400">
            No questions found.
          </div>
        )}
      </main>

      <Footer></Footer>
    </div>

  );
}