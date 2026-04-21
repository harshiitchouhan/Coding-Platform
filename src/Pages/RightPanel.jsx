import { useState } from "react";
import Editor from "@monaco-editor/react";
import axiosClient from "@/Utils/axiosClient";
import { ChevronDown } from "lucide-react";
import { Settings,Sun,Moon } from "lucide-react";
import { RotateCcw, Copy, Maximize2 } from "lucide-react";
import Split from "react-split";
import { Rocket } from "lucide-react";


export default function RightPanel({ problemId, startCode }) {

  const [code, setCode] = useState(startCode?.js || "");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false); 
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);

  const toggleTheme = () => {
  setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
};

  // RUN CODE
  const handleRun = async () => {
    try {
      setLoading(true);
      setOutput("Running...");

      const res = await axiosClient.post(`/submission/run/${problemId}`, {
        code: code, 
        language,
      });

      const results = res.data;

      let outputText = "";

      results.forEach((test, i) => {
        outputText += `Test ${i + 1}:\n`;

        if (test.stdout) {
          outputText += `Output: ${test.stdout}\n`;
        }

        if (test.stderr) {
          outputText += `Error: ${test.stderr}\n`;
        }

        outputText += "\n";
      });

      setOutput(outputText);

    } catch (err) {
      setOutput("Error running code");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SUBMIT CODE
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setOutput("Submitting...");

      const res = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code, // 
        language,
      });

      const data = res.data;

      const total = data.testCasesTotal || data.testCasesPassed;

      setOutput({
      status: data.status,
      passed: data.testCasesPassed,
      total,
      runtime: data.runtime,
      memory: data.memory,
      error: data.errorMsg
    });

    } catch (err) {
      setOutput("Submission failed");
    } finally {
      setLoading(false);
    }
  };


// to reset the editor screen
  const handleReset = () => {
  setCode(" ");
};

// to copy the editor screen
  const handleCopy = () => {
  navigator.clipboard.writeText(code);
};

// for full screen but its not doing like i wanted only right panel to be full screen
  const handleFullScreen = () => {
};

  return (
    <div className="flex flex-col h-full">

      {/* TOP BAR */}
    <div className="flex items-center justify-between px-4 pr-8 py-2 mb-2 rounded-lg bg-[#0B0F1A] border border-white/10">

    <div className="relative">

        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-[#1F2937] px-3 pr-8 py-1.5 rounded-md text-sm outline-none text-gray-200"
        >
            <option value="cpp">C++</option>
            <option value="js">JavaScript</option>
            <option value="java">Java</option>
        </select>

        <ChevronDown 
            size={16} 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
        />

    </div>

        {/* RIGHT: ICON ACTIONS */}
        <div className="flex items-center gap-3">

            <button
                onClick={handleReset}
                className="p-2 rounded-md hover:bg-white/10 transition"
                title="Reset Code"
            >
            <RotateCcw size={16} />
            </button>

            <button
                onClick={handleCopy}
                className="p-2 rounded-md hover:bg-white/10 transition"
                title="Copy Code"
            >
            <Copy size={16} />
            </button>

            <button
                onClick={handleFullScreen}
                className="p-2 rounded-md hover:bg-white/10 transition"
                title="Fullscreen"
            >
            <Maximize2 size={16} />
            </button>

        </div>

        {/* Top mei jo theme and font size h */}
        <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-md bg-[#1F2937] hover:bg-[#374151] transition"
            >
            <Settings size={16} />
        </button>

        {showSettings && (
            <div className="absolute right-4 top-12 w-56 bg-[#111827] border border-white/10 rounded-xl shadow-lg p-4 z-50">

                {/* Theme Toggle */}
                <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-300">Theme</span>

                <button
                    onClick={() =>
                    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"))
                    }
                    className="p-1.5 rounded bg-[#1F2937] hover:bg-[#374151]"
                >
                    {theme === "vs-dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>
                </div>

                {/* Font Size */}
                <div className="mb-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">Font Size</span>
                        <span className="text-xs text-gray-400">{fontSize}px</span>
                    </div>

                    <input
                        type="range"
                        min="12"
                        max="24"
                        step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full accent-purple-500 cursor-pointer"
                    />
                </div>

            </div>
            )}
    </div>

        <div  className="flex-1 overflow-hidden">

        <Split
            direction="vertical"
            sizes={[75, 25]}
            minSize={[200, 120]}
            gutterSize={6}
            className="flex flex-col h-full"
        >

            {/* EDITOR (same code) */}
            <div  className="rounded-lg overflow-hidden border border-white/10">
            <Editor
                height="100%"
                theme={theme}
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                fontSize: fontSize
                }}
            />
            </div>

            {/* OUTPUT + RUN SECTION (same code just merged) */}
            <div className="flex flex-col bg-[#0B0F1A] border border-white/10 rounded-lg">

            {/* RUN / SUBMIT (same buttons) */}
            <div className="flex justify-end gap-3 p-3 border-t border-white/10">
                <button
                onClick={handleRun}
                className="bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-md text-sm"
                >
                ▶ Run
                </button>

                <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-1.5 rounded-md flex items-center gap-2"
                onClick={handleSubmit}>
                <Rocket size={16} />
                Submit
                </button>
            </div>

            {/* Horixonatal Line dedi taki badhiya lage */}
            <div className="border-b border-white/10 mb-2" />

            {/* OUTPUT */}
            <div className="flex-1 p-4 text-sm overflow-auto">

                {typeof output === "string" ? (
                    <div className="text-gray-400 whitespace-pre-wrap">{output}</div>
                ) : output ? (

                    <div className="space-y-4">

                    {/* STATUS BADGE */}
                    <div
                        className={`inline-block px-3 py-1 rounded-md text-sm font-medium
                            ${
                            output.status === "accepted"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                        >
                        {output.status === "accepted" && "Accepted "}
                        {output.status === "wrong answer" && "Wrong Answer "}
                        {output.status === "tle" && "Time Limit Exceeded"}
                        {output.status === "compile error" && "Compilation Error "}
                        {output.status === "runtime error" && "Runtime Error "}
                    </div>

                    {/* TESTCASE RESULT */}
                    <div className="text-gray-300">
                        Testcases Passed: {output.passed} / {output.total} 
                    </div>

                    {/* RUNTIME + MEMORY */}
                    <div className="flex gap-6 text-gray-400">
                        <span>Runtime: {output.runtime} ms</span>
                        <span>Memory: {output.memory} KB</span>
                    </div>

                    {/* ERROR MESSAGE */}
                    {output.status !== "accepted" && output.error && (
                        <div className="mt-3 p-3 rounded-md bg-black/40 border border-white/10 text-red-400 text-xs whitespace-pre-wrap">
                        {output.error}
                        </div>
                    )}

                    </div>

                ) : (
                    <div className="text-gray-500">Run code to see output...</div>
                )}

            </div>

         </div>
    </Split>

    </div>

</div>
  );
}