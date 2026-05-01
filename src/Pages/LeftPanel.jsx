import { useState } from "react";
import SubmissionHistory from "./SubmissionHistory";
import AIAssistant from "./AIAssistant";


import {
  FileText,
  BookOpen,
  Code,
  History,
  Bot
} from "lucide-react";

export default function LeftPanel({ problem }) {
  const [activeTab, setActiveTab] = useState("description");

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
          <h1 className="text-3xl font-semibold text-white mb-3">
            {problem.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                problem.difficultyLevel?.toLowerCase() === "easy"
                  ? "bg-green-500/10 text-green-400"
                  : problem.difficultyLevel?.toLowerCase() === "medium"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {format(problem.difficultyLevel)}
            </span>

            <span className="text-sm text-gray-">
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

          <Section title="Examples">
            {problem.visibleTestCases?.map((ex, i) => (
              <div key={i} className="bg-[#111827] border border-white/10 rounded-xl p-4 mt-3">
                <p className="text-gray-300 text-lg mb-2">
                  Example {i + 1}
                </p>
                <p><span className="text-gray-400">Input:</span> {ex.input}</p>
                <p><span className="text-gray-400">Output:</span> {ex.output}</p>
                <p><span className="text-gray-400">Explanation:</span> {ex.explanation}</p>
              </div>
            ))}
          </Section>
        </div>
      )}

      {activeTab === "editorial" && (
        <div className="text-gray-400">
          {problem.editorial || "Editorial coming soon..."}
        </div>
      )}

      {activeTab === "solutions" && (
        <div className="space-y-6">
          <CodeBlock title="C++" code={problem.refSolution?.find(r => r.language === "cpp")?.completeCode} />
          <CodeBlock title="Java" code={problem.refSolution?.find(r => r.language === "java")?.completeCode} />
          <CodeBlock title="JavaScript" code={problem.refSolution?.find(r => r.language === "javascript")?.completeCode} />
        </div>
      )}

      {activeTab === "submissions" && (
        <SubmissionHistory problemId={problem._id} />
      )}

      {/* 🤖 AI Assistant */}
      {activeTab === "assistant" && (
       <div className="h-180">
        <AIAssistant problem={problem} />
      </div>
      )}

    </div>
  );
}

/* 🔹 Reusable Section */
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-3">
        {title}
      </h2>
      <div className="text-gray-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/* 🔹 Code Block Component */
function CodeBlock({ title, code }) {
  return (
    <div>
      <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
      <pre className="bg-[#111827] p-4 rounded-xl text-sm overflow-x-auto">
        {code || `No ${title} solution`}
      </pre>
    </div>
  );
}