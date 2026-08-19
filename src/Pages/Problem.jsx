import axiosClient from "@/Utils/axiosClient";
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import MainLayout from "../components/layouts/MainLayout";
import { Search,Shuffle } from "lucide-react";
import { setProblems } from "@/Redux/Features/problem/problemSlice";
import Pagination from "../components/shared/Pagination";
import tableBg from "../assets/table.png";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { useNavigate } from "react-router";

export default function Problem(){
    // const [problems,setProblems] = useState([]);
    const [solvedProblems ,setSolvedProblems] = useState([]);
    const [filters,setFilters] = useState(
        {
            difficultyLevel :"all",
            category : "all",
            status : "all"

        }
    )
    const user = useSelector((state) => state.auth.user);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const problems = useSelector((state) => state.problems.problems);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 8;

    const navigate = useNavigate();

    //randoom problem click krke uspr jana
    const handleRandomProblem = () => {
    if (filteredProblems.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    const randomProblem = filteredProblems[randomIndex];

    navigate(`/problem/${randomProblem._id}`);
    };

    //hitting all problem api
    useEffect(()=>{
          const fetchProblems = async () => {
                if (problems.length > 0) return; // already in Redux

                try {
                const res = await axiosClient.get("/problem/allProblem");
                dispatch(setProblems(res.data)); // store in Redux
                } catch (err) {
                console.log(err);
                }
            };

        // hiting solved problem Api
        const fetchSolvedProblems = async()=>{
            try{
                const {data} = await axiosClient.get("/problem/problemSolved");
                // console.log("API 2 RESPONSE:", data);
                setSolvedProblems(data);
            }
            catch(err){
                console.error('Error Fetching Problem' , err);
            }
        };

        fetchProblems();
        if(user) fetchSolvedProblems();
    },[user,problems.length]);

    
    const filteredProblems = problems.filter(problem =>{

    const searchMatch = problem.title?.toLowerCase().includes(search.toLowerCase());

    const difficultyMatch =
        filters.difficultyLevel === "all" ||
        problem.difficultyLevel === filters.difficultyLevel;  

    const categoryMatch =
        filters.category === "all" ||
        problem.category === filters.category;                

    const statusMatch =
        filters.status === "all" ||
        (filters.status === "solved"
            ? solvedProblems.some(sp => sp._id === problem._id)
            : !solvedProblems.some(sp => sp._id === problem._id)
        );

 return searchMatch && difficultyMatch && categoryMatch && statusMatch;
});
    
// Pagination
    useEffect(() => {
    setCurrentPage(1);
    }, [filters,search]);

    
    const indexOfLast = currentPage * problemsPerPage;
    const indexOfFirst = indexOfLast - problemsPerPage;

    const currentProblems = filteredProblems.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);


return (

    <MainLayout>
    <div className="p-6 text-white max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4">Problem Explorer</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl">

        {/* LEFT - SEARCH */}
        <div className="relative w-full md:w-1/3">
        {/* Icon */}
        <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
        />

        {/* Input */}
        <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/20 rounded-md text-white placeholder-gray-400 outline-none focus:border-cyan-400"
        />

</div>

        {/*  RIGHT - FILTERS */}
        <div className="flex flex-wrap gap-3 justify-start md:justify-end">

            {/* 🔵 Status */}
            {/* Random Button */}
            <button
            onClick={handleRandomProblem}
            disabled={filteredProblems.length === 0}
            className="flex items-center gap-2 px-3 py-2w-[150px]` border rounded-lg bg-white/5 border-white/20  hover:bg-white/10 text-white"
        >
            <Shuffle size={16} />
            <span>Random</span>
        </button>
            <Select
            value={filters.status}
            onValueChange={(value) =>
                setFilters({ ...filters, status: value })
            }
            >
            <SelectTrigger className="`w-[150px]` bg-cyan-500/10 border-cyan-400/30 text-white">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-cyan-500/10 backdrop-blur-xl text-white border border-cyan-400/30">
                <SelectItem value="all">All Problems</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
            </SelectContent>
            </Select>

            {/*  Difficulty */}
            <Select
            value={filters.difficultyLevel}
            onValueChange={(value) =>
                setFilters({ ...filters, difficultyLevel: value })
            }
            >
            <SelectTrigger className=" `w-[150px]` bg-purple-500/10 border-purple-400/30 text-white">
                <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-purple-500/10 backdrop-blur-xl text-white border border-purple-400/30">
                <SelectItem value="all">All Difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
            </Select>

            {/*  Category */}
            <Select
            value={filters.category}
            onValueChange={(value) =>
                setFilters({ ...filters, category: value })
            }
            >
            <SelectTrigger className="`w-[150px]` bg-emerald-500/10 border-emerald-400/30 text-white">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-emerald-500/10 backdrop-blur-xl text-white border border-emerald-400/30">
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="array">Array</SelectItem>
                <SelectItem value="linkedList">Linked List</SelectItem>
                <SelectItem value="graph">Graph</SelectItem>
                <SelectItem value="dp">DP</SelectItem>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="tree">Tree</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="recursion">Recursion</SelectItem>
                <SelectItem value="greedy">Greedy</SelectItem>
                <SelectItem value="matrix">Matrix</SelectItem>
                <SelectItem value="stack">Stack</SelectItem>
                <SelectItem value="queue">Queue</SelectItem>
                <SelectItem value="binary-search">Binary Search</SelectItem>
                <SelectItem value="hashing">Hashing</SelectItem>

                
            </SelectContent>
            </Select>

  </div>
        </div>
        {/* PREMIUM TABLE */}
        <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-[#070B12]/70 shadow-[0_0_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">

            {/* BG IMAGE */}
            <img
                src={tableBg}
                alt="table background"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-200"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/45" />

            {/* CYAN GLOW */}
            <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-[120px]" />

            {/* GOLD GLOW */}
            <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-yellow-400/10 blur-[120px]" />

            {/* CONTENT */}
            <div className="relative z-10 overflow-x-auto">

                <table className="w-full text-left border-collapse">

                    {/* Header */}
                    <thead className="bg-white/6 backdrop-blur-xl text-gray-300 text-sm uppercase tracking-[0.18em] border-b border-white/10">
                        <tr>
                            <th className="px-6 py-5">#</th>
                            <th className="px-6 py-5">Problem</th>
                            <th className="px-6 py-5">Difficulty</th>
                            <th className="px-6 py-5">Category</th>
                            <th className="px-6 py-5">Status</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>

                        {currentProblems.map((p, index) => {

                            const level =
                                p.difficultyLevel.charAt(0).toUpperCase() +
                                p.difficultyLevel.slice(1).toLowerCase();

                            return (
                                <tr
                                    key={p._id}
                                    onClick={() => navigate(`/problem/${p._id}`)}
                                    className="group cursor-pointer border-b border-white/5 bg-white/2 transition duration-300 hover:bg-cyan-400/5"
                                >

                                    {/* Number */}
                                    <td className="px-6 py-5 text-gray-400 font-medium">
                                        {indexOfFirst + index + 1}
                                    </td>

                                    {/* Title */}
                                    <td className="px-6 py-5">
                                        <span className="font-semibold text-white transition group-hover:text-cyan-300">
                                            {p.title}
                                        </span>
                                    </td>

                                    {/* Difficulty */}
                                    <td className="px-6 py-5">
                                        <span
                                            className={`px-3 py-1 text-xs font-bold rounded-full border ${
                                                p.difficultyLevel === "easy"
                                                    ? "border-green-400/20 bg-green-500/10 text-green-400"
                                                    : p.difficultyLevel === "medium"
                                                    ? "border-yellow-400/20 bg-yellow-500/10 text-yellow-400"
                                                    : "border-red-400/20 bg-red-500/10 text-red-400"
                                            }`}
                                        >
                                            {level}
                                        </span>
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-5">
                                        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-gray-300 border border-white/10 capitalize">
                                            {p.category}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        {solvedProblems?.some(
                                            (sp) => sp._id.toString() === p._id.toString()
                                        ) ? (
                                            <span className="rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                                                Solved
                                            </span>
                                        ) : (
                                            <span className="rounded-full border border-gray-400/10 bg-gray-500/10 px-3 py-1 text-xs font-bold text-gray-300">
                                                Unsolved
                                            </span>
                                        )}
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>
            </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
        
    </div>
    </MainLayout>
);

        


} 