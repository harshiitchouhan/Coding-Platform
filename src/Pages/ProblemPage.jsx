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

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axiosClient.get(`/problem/problemById/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProblem();
  }, [id]);

  if (!problem) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
  <MainLayout showFooter={false}>
        
    <div className="h-screen flex bg-[#0B0F1A] text-gray-200">

    <Split
        className="flex flex-1"
        sizes={[55, 45]}
        minSize={[400, 500]}
        gutterSize={6}
    >

        {/* LEFT */}
        <div className="overflow-y-auto h-full  min-w-0">
        <div className="max-w-3xl mx-auto px-6 py-5">
            <LeftPanel problem={problem} />
        </div>
        </div>

        {/* RIGHT */}
        <div className="min-w-125 flex flex-col bg-[#111827] p-4">
        <RightPanel
            problemId={problem._id}
            functionSignature={problem.functionSignature}
        />
        </div>

    </Split>
</div>

  </MainLayout>
);
}