import { useState,useEffect ,useRef } from "react";
import Editor from "@monaco-editor/react";
import axiosClient from "@/Utils/axiosClient";
import { ChevronDown } from "lucide-react";
import { Settings,Sun,Moon } from "lucide-react";
import { RotateCcw, Copy, Maximize2 } from "lucide-react";
import Split from "react-split";
import { Rocket} from "lucide-react";

export default function RightPanel({ problemId, problem }) {

  const [codeMap, setCodeMap] = useState({cpp: "",javascript: "",java: ""});
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false); 
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState("testcase"); // 

  const settingsRef = useRef(null);


  function normalizeInput(input) {
    return input
      .split("\n")
      .map(line => {
        if (line.includes("=")) {
          return line.split("=")[1].trim();
        }
        return line.trim();
      })
      .filter(line => line.length > 0)
      .join("\n");
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

// editor mei prewritten code dikhana
useEffect(() => {
  if (problem?.startCode) {
    const map = {
      cpp: "",
      javascript: "",
      java: "",
    };

    problem.startCode.forEach((item) => {
      map[item.language] = item.boilerCode;
    });

    setCodeMap(map);
  }
}, [problem]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // RUN CODE
  const handleRun = async () => {
    try {
      setLoading(true);
      setOutput("Running...");

      const finalInput =
        activeTab === "custom" ? normalizeInput(input) : "";

      const res = await axiosClient.post(`/submission/run/${problemId}`, {
        code: codeMap[language],
        language,
        input: finalInput, 
      });

      // console.log("RUN RESPONSE:", res.data);
      // console.log("INPUT RECEIVED:", req.body.input);
      const results = res.data;

      let outputText = "";

      results.forEach((test, i) => {
      outputText += `Test ${i + 1}:\n`;

      if (test.stdout !== null && test.stdout !== undefined) {
        outputText += `Output: ${test.stdout.trim()}\n`;
      }

      if (test.stderr) {
        outputText += `Error: ${test.stderr}\n`;
      }

      if (!test.stdout && !test.stderr) {
        outputText += `Output: (no output)\n`;
      }

      outputText += "\n";
    });

      setOutput(outputText);

    } catch (err) {
  console.log("RUN ERROR:", err.response?.data || err.message);

  setOutput(
    err.response?.data?.message ||
    err.response?.data ||
    "Error running code"
  );
} finally {
      setLoading(false);
    }
  };

  // SUBMIT CODE
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setOutput("Submitting...");

      const finalInput =
        activeTab === "custom" ? normalizeInput(input) : "";

      const res = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: codeMap[language],
        language,
        input: finalInput, 
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

const handleReset = () => {
  const defaultCode =
    problem?.startCode?.find((item) => item.language === language)?.boilerCode || "";

  setCodeMap((prev) => ({
    ...prev,
    [language]: defaultCode,
  }));
};

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeMap[language] || "");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleFullScreen = () => {};

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
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>

          <ChevronDown 
            size={16} 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="p-2 hover:bg-white/10"><RotateCcw size={16} /></button>
          <button onClick={handleCopy} className="p-2 hover:bg-white/10"><Copy size={16} /></button>
          <button onClick={handleFullScreen} className="p-2 hover:bg-white/10"><Maximize2 size={16} /></button>
        </div>

        <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-[#1F2937]">
          <Settings size={16} />
        </button>

      </div>

      <div className="flex-1 overflow-hidden">

        <Split direction="vertical" sizes={[60, 40]} minSize={[200, 120]} className="flex flex-col h-full">

          {/* EDITOR */}
          <Editor
            height="100%"
            theme={theme}
            language={language}
            value={codeMap[language]}
            onChange={(value) =>
              setCodeMap((prev) => ({ ...prev, [language]: value }))
            }
          />

          {/* OUTPUT + INPUT */}
          <div className="flex flex-col bg-[#0B0F1A]">

            <div className="flex items-center justify-between border-b border-white/10 px-3">

  {/* LEFT: TABS */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("testcase")}
            className={`px-4 py-2 text-sm ${
              activeTab === "testcase"
                ? "border-b-2 border-purple-500 text-white"
                : "text-gray-400"
            }`}
          >
            Testcases
          </button>

          {/* <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-2 text-sm ${
              activeTab === "custom"
                ? "border-b-2 border-purple-500 text-white"
                : "text-gray-400"
            }`}
          >
            Custom Input
          </button> */}
          
        </div>

        {/* RIGHT: BUTTONS */}
        <div className="flex gap-3 py-2">
          <button
            onClick={handleRun}
            className="bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-md text-sm text-white"
          >
            ▶ Run
          </button>

          <button
            onClick={handleSubmit}
            className="bg-cyan-400 hover:bg-cyan-500 px-4 py-1.5 rounded-md text-sm text-white flex items-center gap-2"
          >
            <Rocket size={14} />
            Submit
          </button>
        </div>

      </div>

            {/* CUSTOM INPUT
            {activeTab === "custom" && (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`nums = [2,7,11,15]\ntarget = 9`}
                className="w-full h-32 p-2 bg-black text-white"
              />
            )} */}

            {/* OUTPUT */}
            {activeTab === "testcase" && (
              <div className="flex-1 text-sm overflow-auto">

              {/* RUN OUTPUT */}
              {typeof output === "string" ? (
                <div className="text-gray-400 whitespace-pre-wrap p-4">
                  {output || "Run code to see output..."}
                </div>
              ) : output ? (

                /* SUBMIT OUTPUT CARD */
                <div className="space-y-5 animate-fadeIn p-4">

                  {/* Status Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-lg
                        ${output.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                        }`}
                    >
                      {output.status === "accepted" ? "✓" : "✕"}
                    </div>

                    <div>
                      <h2
                        className={`text-xl font-bold ${
                          output.status === "accepted"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {output.status === "accepted" ? "Accepted" : output.status}
                      </h2>

                      <p className="text-xs text-gray-400">
                        {output.passed} / {output.total} testcases passed
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                    <div className="rounded-xl bg-[#111827] border border-white/10 p-4">
                      <p className="text-xs text-gray-400 mb-1">Passed</p>
                      <p className="text-lg font-semibold text-white">
                        {output.passed}/{output.total}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#111827] border border-white/10 p-4">
                      <p className="text-xs text-gray-400 mb-1">Runtime</p>
                      <p className="text-lg font-semibold text-white">
                        {output.runtime} ms
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#111827] border border-white/10 p-4">
                      <p className="text-xs text-gray-400 mb-1">Memory</p>
                      <p className="text-lg font-semibold text-white">
                        {output.memory} KB
                      </p>
                    </div>
                  </div>

                  {/* Error */}
                  {output.status !== "accepted" && output.error && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm whitespace-pre-wrap">
                      {output.error}
                    </div>
                    
                  )}
                  
                </div>

              ) : (
                <div className="text-gray-500 p-4">
                  Run code to see output...
                </div>
              )}

              </div>
      )}

          </div>

        </Split>
      </div>

    </div>
  );
}