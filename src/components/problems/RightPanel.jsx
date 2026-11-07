import { useState,useEffect ,useRef } from "react";
import Editor from "@monaco-editor/react";
import axiosClient from "@/Utils/axiosClient";
import { ChevronDown } from "lucide-react";
import { Settings,Sun,Moon } from "lucide-react";
import { RotateCcw, Copy, Maximize2 } from "lucide-react";
import Split from "react-split";
import { Rocket,Check,X} from "lucide-react";

// tHEY are cooming from parent problem page
export default function RightPanel({problemId, problem, mode = "practice", fetchContestStats,contestId,language, setLanguage, codeMap, setCodeMap,}) {

  // sTATE lIFTING
  // const [codeMap, setCodeMap] = useState({cpp: "",javascript: "",java: ""});
  // const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null);
  const [selectedCase, setSelectedCase] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState("testcase"); // 
  const [submitCooldown, setSubmitCooldown] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Show the problem's visible testcases even before the user presses Run.
  const visibleCases = Array.isArray(problem?.visibleTestCases)
    ? problem.visibleTestCases
    : [];
  const runCases = Array.isArray(output) ? output : [];
  const totalCases = Math.max(visibleCases.length, runCases.length);

  const startSubmitCooldown = (seconds = 10) => {
  setSubmitCooldown(seconds);

  const timer = setInterval(() => {
    setSubmitCooldown((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);
};
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

  // Judge0 returns runtime in seconds and memory in KB.
  const formatRuntime = (seconds) => {
    if (seconds === null || seconds === undefined || seconds === "") return "—";

    const numericSeconds = Number(seconds);
    if (!Number.isFinite(numericSeconds)) return "—";

    const milliseconds = numericSeconds * 1000;
    const decimals = milliseconds < 1 ? 3 : milliseconds < 10 ? 2 : 1;
    return `${Number(milliseconds.toFixed(decimals))} ms`;
  };

  const formatMemory = (kilobytes) => {
    if (kilobytes === null || kilobytes === undefined || kilobytes === "") return "—";

    const numericKilobytes = Number(kilobytes);
    if (!Number.isFinite(numericKilobytes)) return "—";

    return numericKilobytes >= 1024
      ? `${Number((numericKilobytes / 1024).toFixed(2))} MB`
      : `${Number(numericKilobytes.toFixed(2))} KB`;
  };

  useEffect(() => {
    setSelectedCase(0);
    setOutput("");
    setSubmissionResult(null);
  }, [problemId]);

  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  // };

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
      setActiveTab("testcase");
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

      // Keep each run result separate so users can switch between cases.
      setSelectedCase(0);
      setOutput(Array.isArray(results) ? results : []);

    } catch (err) {
  // console.log("RUN ERROR:", err.response?.data || err.message); 

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
  if (submitting || loading || submitCooldown > 0) return;

  try {
    setActiveTab("results");
    setSubmitting(true);
    setSubmissionResult("Submitting...");

    const finalInput =
      activeTab === "custom" ? normalizeInput(input) : "";

    const submitUrl =
      mode === "contest"
        ? `/contest/${contestId}/submit/${problemId}`
        : `/submission/submit/${problemId}`;

    // console.log("MODE:", mode);
    // console.log("SUBMIT URL:", submitUrl);

    const res = await axiosClient.post(submitUrl, {
      code: codeMap[language],
      language,
      input: finalInput,
    });

    // normal submit ke liye data ke ander sab h lekin contest ke liye
    // data.submission mei h sab jaise status testcases etc
    const data =
      mode === "contest"
        ? res.data.submission
        : res.data;

    const total =
      data.testCasesTotal ?? data.testCasesPassed;

    setSubmissionResult({
      status: data.status,
      passed: data.testCasesPassed,
      total,
      runtime: data.runtime,
      memory: data.memory,
      error: data.errorMsg,
      points:
      mode === "contest"
      ? res.data.contestSubmission?.points
      : null,
    });

    if (mode === "contest") {
      fetchContestStats?.();
    }
    startSubmitCooldown(10);

  } catch (err) {
    //  console.log("RUN ERROR:", err.response?.data || err.message); 
    if (err.response?.status === 429) {
      const retryAfter = err.response?.data?.retryAfter || 10;

      startSubmitCooldown(retryAfter);

      setSubmissionResult({
        status: "Rate Limited",
        error:
          err.response?.data?.message ||
          `Wait ${retryAfter}s before submitting again`,
      });
      
      return;
    }
    if (err.response?.data?.submission) {

    const data = err.response.data.submission;

    setSubmissionResult({
      status: data.status,
      passed: data.testCasesPassed,
      total:
        data.testCasesTotal ??
        data.testCasesPassed,

      runtime: data.runtime,
      memory: data.memory,
      error: data.errorMsg,

      points:
        err.response.data.contestSubmission
          ?.points || 0,
    });

    return;
  }

    // setOutput({
    //   status: "Error",
    //   error: err.response?.data?.message || "Submission failed",
    // });
    setSubmissionResult({
      status: "Error",
      error:
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : err.message) ||
        "Submission failed",
    });

  } finally {
    setSubmitting(false);
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

      <div className="relative" ref={settingsRef}>

      <button
        onClick={() => setShowSettings(!showSettings)}
        className="p-2 rounded-md bg-[#1F2937] hover:bg-[#374151] transition"
      >
        <Settings size={16} />
      </button>

      {showSettings && (
        <div className="absolute right-0 top-12 w-56 bg-[#111827] border border-white/10 rounded-xl shadow-lg p-4 z-50">

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

      </div>

      <div className="flex-1 overflow-hidden">

        <Split direction="vertical" sizes={[60, 40]} minSize={[200, 80]} className="flex flex-col h-full">

          {/* EDITOR */}
          <Editor
            height="100%"
            theme={theme}
            language={language}
            value={codeMap[language]}
            onChange={(value) =>
              setCodeMap((prev) => ({ ...prev, [language]: value }))
            }
            options={{
              fontSize: fontSize,
            }}
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

          <button
            onClick={() => setActiveTab("results")}
            className={`px-4 py-2 text-sm ${
              activeTab === "results"
                ? "border-b-2 border-purple-500 text-white"
                : "text-gray-400"
            }`}
          >
            Results
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
            disabled={loading || submitting}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1.5 rounded-md text-sm text-white"
          >
            {loading ? "Running..." : "▶ Run"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || submitting || submitCooldown > 0}
            className={`px-4 py-1.5 rounded-md text-sm text-white flex items-center gap-2
              ${
                loading || submitting || submitCooldown > 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            <Rocket size={14} />

            {submitting
              ? "Submitting..."
              : submitCooldown > 0
              ? `Wait ${submitCooldown}s`
              : "Submit"}
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
                {totalCases > 0 ? (
                  <div className="p-4 space-y-4">
                    {/* Case tabs are available immediately from visibleTestCases. */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {Array.from({ length: totalCases }, (_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedCase(index)}
                          className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                            selectedCase === index
                              ? "bg-purple-500/15 text-purple-300 border border-purple-500/50"
                              : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          Case {index + 1}
                        </button>
                      ))}
                    </div>

                    {/* Run errors appear above the case, rather than hiding its details. */}
                    {typeof output === "string" && output && (
                      <div
                        className={`rounded-lg border p-3 whitespace-pre-wrap ${
                          loading
                            ? "border-purple-500/20 bg-purple-500/5 text-purple-300"
                            : "border-red-500/20 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {output}
                      </div>
                    )}

                    {selectedCase < totalCases && (() => {
                      const test = runCases[selectedCase];
                      const visibleCase = visibleCases[selectedCase];

                      const inputValue = visibleCase?.input ?? test?.input ?? null;
                      const expectedValue =
                        visibleCase?.output ?? test?.expected_output ?? null;

                      const stdout = test?.stdout?.trim();
                      const stderr = test?.stderr?.trim();
                      const compileError = test?.compile_output?.trim();
                      const actualOutput = test
                        ? (stdout || "No output produced.")
                        : "Run code to see output...";

                      return (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-400">Input</p>
                            <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-sm text-gray-200">
                              {inputValue ?? "Not available."}
                            </pre>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-400">Output</p>
                            <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-sm text-gray-200">
                              {actualOutput}
                            </pre>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-400">Expected</p>
                            <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-sm text-gray-200">
                              {expectedValue ?? "Not available."}
                            </pre>
                          </div>

                          {(stderr || compileError) && (
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-red-400">
                                {compileError ? "Compile Error" : "Runtime Error"}
                              </p>
                              <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-red-500/20 bg-red-500/10 p-4 font-mono text-sm text-red-300">
                                {compileError || stderr}
                              </pre>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-gray-400 whitespace-pre-wrap p-4">
                    {typeof output === "string" && output
                      ? output
                      : problem
                        ? "No visible testcases are available for this problem."
                        : "Loading testcases..."}
                  </div>
                )}
              </div>
            )}

            {activeTab === "results" && (
              <div className="flex-1 text-sm overflow-auto">
              {typeof submissionResult === "string" ? (
                <div className="text-gray-400 whitespace-pre-wrap p-4">
                  {submissionResult}
                </div>
              ) : submissionResult ? (

                /* SUBMIT OUTPUT CARD */
                <div className="space-y-5 animate-fadeIn p-4">

                  {/* Status Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-lg
                        ${submissionResult.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                        }`}
                    >
                      {/* {output.status === "accepted" ? "" : "✕"} */}
                      {submissionResult.status === "accepted" ? (
                        <Check className="text-emerald-400" size={26} />
                      ) : (
                        <X className="text-red-400" size={26} />
                      )}
                    </div>

                    <div>
                      <h2
                        className={`text-xl font-bold ${
                          submissionResult.status === "accepted"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {submissionResult.status === "accepted" ? "Accepted" : submissionResult.status}
                      </h2>

                      <p className="text-xs text-gray-400">
                        {submissionResult.passed != null && submissionResult.total != null
                          ? `${submissionResult.passed} / ${submissionResult.total} testcases passed`
                          : "Submission result"}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">

                    <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4">
                      <p className="text-xs text-gray-400 mb-1">Runtime</p>
                      <p className="text-lg font-semibold text-white">
                        {formatRuntime(submissionResult.runtime)}
                      </p>
                    </div>


                    {submissionResult?.points !== null && submissionResult?.points !== undefined && (
                      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-500/10 p-4">
                        <p className="text-sm text-gray-400">
                          Points Earned
                        </p>

                        <p className="mt-2 text-xl font-black text-yellow-300">
                          +{submissionResult.points}
                        </p>
                      </div>
                    )}

                    

                    <div className="rounded-2xl  border border-green-400/20 bg-green-500/10 p-4">
                      <p className="text-xs text-gray-400 mb-1">Memory</p>
                      <p className="text-lg font-semibold text-white">
                        {formatMemory(submissionResult.memory)}
                      </p>
                    </div>
                  </div>

                  {/* Error */}
                  {submissionResult.status !== "accepted" && submissionResult.error && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm whitespace-pre-wrap">
                      {submissionResult.error}
                    </div>
                    
                  )}
                  
                </div>

              ) : (
                <div className="text-gray-500 p-4">
                  Submit code to see results...
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