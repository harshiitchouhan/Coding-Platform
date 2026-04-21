import { useState } from "react";

export default function LeftPanel({ problem }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = ["description", "editorial", "solutions", "submissions"];

  const format = (text) =>
    text?.charAt(0).toUpperCase() + text?.slice(1);

  return (
    <div>

      {/* TABS */}
      <div className="flex gap-2 p-2 bg-[#111827] rounded-xl border border-white/10 w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${activeTab === tab
                ? "bg-purple-600 text-white shadow"
                : "text-gray-400 hover:text-white"
              }`}
          >
            {format(tab)}
          </button>
        ))}
      </div>
    {/* Horixonatal Line dedi taki badhiya lage */}
      <div className="border-b border-white/10 mb-6" />

      {/* TITLE */}
      <h1 className="text-3xl font-semibold text-white mb-3">
        {problem.title}
      </h1>

      {/* META */}
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400">
          {format(problem.difficultyLevel)}
        </span>

        <span className="text-sm text-purple-400">
          {format(problem.category)}
        </span>

      </div>
      {/* Horixonatal Line dedi taki badhiya lage */}
      <div className="border-b border-white/10 mb-6" />

      {/* CONTENT */}
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
                <p className="text-base"><span className="text-gray-400">Input:</span> {ex.input}</p>
                <p className="text-base"><span className="text-gray-400">Output:</span> {ex.output}</p>
                <p className="text-base"><span className="text-gray-400">Explanation:</span> {ex.explanation}</p>
              </div>
            ))}
          </Section>

        </div>
      )}

      {activeTab === "editorial" && (
        <div className="text-gray-400">Editorial coming soon...</div>
      )}

      {activeTab === "solutions" && (
        <pre className="bg-[#111827] p-4 rounded-xl text-sm overflow-x-auto">
          {problem.refSolution?.cpp || "No solution available"}
        </pre>
      )}

      {activeTab === "submissions" && (
        <div className="text-gray-400">
          No submissions yet...
        </div>
      )}
    </div>
  );
}

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