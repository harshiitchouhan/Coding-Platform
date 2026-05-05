import { useEffect, useState } from "react";
import axiosClient from "@/Utils/axiosClient";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useParams } from "react-router";
import MainLayout from "./MainLayout";
import Split from "react-split";

export default function ProblemPage() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);

  //state lifting
  const [aiMessages, setAiMessages] = useState([]);

  const [language, setLanguage] = useState("cpp");

  const [codeMap, setCodeMap] = useState({
    cpp: "",
    javascript: "",
    java: "",
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axiosClient.get(`/problem/problemById/${id}`);
        //  console.log("FULL PROBLEM:", res.data);
        setProblem(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProblem();
  }, [id]);

// pick random problem ke time use hua
if (!problem)
  return (
    <MainLayout showFooter={false}>
      <div className="h-screen flex bg-[#0B0F1A] text-gray-200 p-6 gap-6">

        {/* LEFT SKELETON */}
        <div className="w-[55%] space-y-6 animate-pulse">
          <div className="h-8 w-2/3 bg-white/10 rounded-md" />

          <div className="flex gap-3">
            <div className="h-8 w-20 bg-white/10 rounded-full" />
            <div className="h-8 w-24 bg-white/10 rounded-full" />
          </div>

          <div className="space-y-3 mt-8">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
            <div className="h-4 w-4/6 bg-white/10 rounded" />
          </div>

          <div className="h-32 w-full bg-white/10 rounded-xl mt-8" />
          <div className="h-32 w-full bg-white/10 rounded-xl" />
        </div>

        {/* RIGHT SKELETON */}
        <div className="w-[45%] space-y-4 animate-pulse">
          <div className="h-12 w-full bg-white/10 rounded-xl" />
          <div className="h-125 w-full bg-white/10 rounded-xl" />
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-white/10 rounded-lg" />
            <div className="h-10 w-24 bg-white/10 rounded-lg" />
          </div>
        </div>

      </div>
    </MainLayout>
  );

  return (
  <MainLayout showFooter={false}>
        
  <div className="h-[calc(100vh-72px)] flex bg-[#0B0F1A] text-gray-200 overflow-hidden">

    <Split
      className="flex flex-1 w-full h-full overflow-hidden"
      sizes={[47,53]}
      minSize={[500, 500]}
      gutterSize={6}
    >

      {/* LEFT */}
      <div className="overflow-y-auto h-full min-w-0">
        <div className="max-w-3xl mx-auto px-6 py-5">
        <LeftPanel
            problem={problem}
            // state lifting
            aiMessages={aiMessages}
            setAiMessages={setAiMessages}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#111827] p-4 overflow-hidden">
        <RightPanel
            problemId={problem._id}
            problem={problem}
            // state lifting
            language={language}
            setLanguage={setLanguage}
            codeMap={codeMap}
            setCodeMap={setCodeMap}
          />
      </div>

    </Split>
</div>

  </MainLayout>
);
}