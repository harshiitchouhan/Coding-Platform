import { useState } from "react";
import SubmissionHistory from "./SubmissionHistory";
import AIAssistant from "./AIAssistant";
import {FileText,BookOpen,Code,History,Bot, Building2,ArrowRight , Lightbulb,ChevronDown, Lock, Sparkles} from "lucide-react";
import Editorial from "./Editorial";

// tHEY are cooming from parent problem page
export default function LeftPanel({ problem, aiMessages, setAiMessages }) {
  const [activeTab, setActiveTab] = useState("description");
  const [showCompanies, setShowCompanies] = useState(false);
  // const [openHint, setOpenHint] = useState(null);
  const [hintIndex, setHintIndex] = useState(0);

  const tabs = [
    { key: "description", icon: FileText },
    { key: "editorial", icon: BookOpen },
    { key: "solutions", icon: Code },
    { key: "submissions", icon: History },
    { key: "assistant", icon: Bot },
  ];

  const format = (text) =>
    text?.charAt(0).toUpperCase() + text?.slice(1);

  function formatExampleInput(input, labels = []) {
  const lines = input.split("\n");

  if (!labels.length || labels.length !== lines.length) {
    return input;
  }

  return lines
    .map((line, i) => {
      let value = line.trim();

      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1);
      }

      return `${labels[i]} = ${value}`;
    })
    .join(", ");
}

function formatExampleInput(input, inputFields = []) {
  const lines = input?.split("\n") || [];

  const formatted = lines.map((line, index) => {
    const label = inputFields[index] || `input${index + 1}`;

    const isArray = line.startsWith("[") && line.endsWith("]");
    const isNumber = !isNaN(line);

    const value = isArray || isNumber ? line : `"${line}"`;

    return `${label} = ${value}`;
  });

  return formatted.join(" , ");
}

  return (
    <div>

      

      {/* 🔹 TABS */}
      <div className="flex gap-2 p-2 bg-[#111827] rounded-xl border border-white/10 w-fit mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  activeTab === tab.key
                    ? "bg-gray-700 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
            >
              <Icon size={16} />
              {format(tab.key)}
            </button>
          );
        })}
      </div>

      <div className="border-b border-white/10 mb-6" />

      {/* 🔹 TITLE */}
      {activeTab === "description" && (
        <>
          <h1 className="text-3xl font-semibold text-white mb-3 font-serif leading-relaxed">
            {problem.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 text-sm rounded-full font-serif ${
                problem.difficultyLevel?.toLowerCase() === "easy"
                  ? "bg-green-500/10 text-green-400"
                  : problem.difficultyLevel?.toLowerCase() === "medium"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {format(problem.difficultyLevel)}
            </span>

            {/* Company */}
            {problem.companies?.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowCompanies(!showCompanies)}
                className="flex items-center gap-1 px-3 py-1 font-serif rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 text-sm hover:bg-cyan-500/20 transition"
              >
                <Building2 size={14} />
                Companies
              </button>

              {showCompanies && (
                <div className="absolute left-0 top-9 z-50 w-56 rounded-xl bg-[#0F172A] border border-slate-700 shadow-xl p-3">
                  <p className="text-xs text-slate-400 mb-2">Asked in</p>

                  <div className="flex flex-wrap gap-2">
                    {problem.companies.map((company, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-xs"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          )}
          <span className="text-md font-semibold text-gray-200">
              {format(problem.category)}
          </span>
    </div>
          
        <div className="border-b border-white/10 mb-6" />
        </>
      )}

      {/* 🔹 CONTENT */}
      {activeTab === "description" && (
        <div className="space-y-6">
          <Section title="Problem Statement">
            {problem.description}
          </Section>

          <Section title="Examples:">
            {problem.visibleTestCases?.map((ex, i) => (
              <div key={i} className="bg-[#111827] border text-base border-white/10 rounded-xl p-4 mt-3">
                <p className="text-gray-300 text-lg  mb-2  ">
                  Example {i + 1}:
                </p>
                    <p className="font-semibold">
                      <span className="text-blue-400">Input:</span>{" "}
                      <span className="text-gray-200 font-mono">
                        {formatExampleInput(ex.input, problem.inputFields)}
                      </span>
                    </p>

                  <p className="font-semibold">
                      <span className="text-blue-400">Output:</span>{" "}
                      <span className="text-gray-200 font-mono">
                       {ex.output}
                      </span>
                  </p>

                  <p className="font-semibold">
                      <span className="text-blue-400">Explanation:</span>{" "}
                      <span className="text-gray-200 font-mono">
                       {ex.explanation}
                      </span>
                    </p>
              </div>
            ))}
          </Section>

              {/* Constraints */}
              {problem.constraints && (
              <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Constraints:
                  </h3>

                  <pre className="bg-[#111827] border border-white/10 rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap">
                    {problem.constraints}
                  </pre>
                </div>
              )}

              {/* Hints */}
              {problem.hints?.length > 0 && (
                <div className="mt-6 rounded-2xl border border-slate-800 bg-linear-to-br from-slate-950 to-slate-900 p-4 shadow-lg">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center">
                        <Lightbulb size={18} className="text-indigo-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          Need a hint?
                        </h3>
                        <p className="text-xs text-slate-500">
                          Reveal step by step without spoiling everything.
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-500">
                      {hintIndex}/{problem.hints.length}
                    </span>
                  </div>

                  {/* Revealed Hints */}
                  <div className="space-y-3">
                    {problem.hints.slice(0, hintIndex).map((hint, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-slate-900/70 border border-slate-700/70 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-6 w-6 rounded-full bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-xs text-indigo-300">
                            {i + 1}
                          </div>

                          <p className="text-sm leading-relaxed text-slate-300">
                            {hint}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Locked / Reveal Button */}
                  {hintIndex < problem.hints.length ? (
                    <button
                      onClick={() => setHintIndex(hintIndex + 1)}
                      className="mt-4 w-full rounded-xl border border-indigo-400/20 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-3 text-sm text-indigo-200 transition flex items-center justify-center gap-2"
                    >
                      <Lock size={15} />
                      Reveal Hint {hintIndex + 1}
                    </button>
                  ) : (
                    <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 flex items-center justify-center gap-2">
                      <Sparkles size={15} />
                      All hints revealed
                    </div>
                  )}
                </div>
                
              )}
              {/* BitMentor AI CTA */}
                <div className="mt-5 rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-500/10 to-indigo-500/10 p-4 flex items-center justify-between gap-4">

                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center">
                      <Bot size={18} className="text-purple-300" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-100">
                        Need deeper guidance?
                      </p>
                      <p className="text-xs text-slate-400">
                        Try <span   onClick={() => setActiveTab("assistant")} className="text-purple-300 font-medium cursor-pointer">BitMentor AI</span> for step-by-step explanations, hints, and debugging help.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("assistant")}
                    className="flex items-center gap-1 text-sm text-purple-300 hover:text-purple-200 transition"
                  >
                    Ask AI
                    <ArrowRight size={14} />
                  </button>
                </div>

        </div>
      )}

      

    {/* Editorial */}
      {activeTab === "editorial" && (
        <div className="text-gray-400">
        <Editorial secureURL={problem.secureURL} thumbnailURL={problem.thumbnailURL} duration= {problem.duration} editorial ={problem.editorial}/>
        </div>
    )}

      {/* Solutions */}
      {activeTab === "solutions" && (
        <div className="space-y-3">
          {problem.refSolution?.map((sol, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              {/* Language Bar */}
              <div className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/3 border-b border-white/10">
                {sol.language.toUpperCase()}
              </div>

              {/* Code */}
              <pre className="p-3 text-sm text-gray-200 overflow-x-auto leading-5">
                <code>{sol.completeCode || "No solution available"}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {activeTab === "submissions" && (
        <SubmissionHistory problemId={problem._id} />
      )}

      {/*  AI Assistant */}
      {/* state lifting because while switch tab the chat and code is gones */}
      {activeTab === "assistant" && (
       <div className="h-165">
        <AIAssistant
            problem={problem}
            messages={aiMessages}
            setMessages={setAiMessages}
          />
      </div>
      )}

    </div>
  );
}

/* 🔹 Reusable Section */
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-3">
        {title}
      </h2>
      <div className="text-gray-300 text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}
