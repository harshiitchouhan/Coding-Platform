import axiosClient from "@/Utils/axiosClient";
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux";
import MainLayout from "./MainLayout";
import { Search,Shuffle } from "lucide-react";
import { setProblems } from "@/Redux/Features/problem/problemSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
    }, [filters]);

    
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

        {/* 🎯 RIGHT - FILTERS */}
        <div className="flex flex-wrap gap-3 justify-start md:justify-end">

            {/* 🔵 Status */}
            {/* 🔀 Random Button */}
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

            {/* 🟣 Difficulty */}
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

            {/* 🟢 Category */}
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
            </SelectContent>
            </Select>

  </div>
        </div>
        {/* TABLE */}
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">

            <table className="w-full text-left">

                {/* Header */}
                <thead className="bg-white/5 text-gray-300 text-sm uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Problem</th>
                    <th className="px-6 py-4">Difficulty</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-white/5">

                {currentProblems.map((p, index) => {

                    //convert easy into Easy medium into Medium
                    const level =
                    p.difficultyLevel.charAt(0).toUpperCase() +
                    p.difficultyLevel.slice(1).toLowerCase();

                    //   const isSolved = solvedProblems?.some(
                    //     (sp) => sp._id.toString() === p._id.toString()
                    // );

                    return (
                    <tr
                        key={p._id}
                        onClick={() => navigate(`/problem/${p._id}`)}
                        className="hover:bg-white/5 transition group cursor-pointer"
                    >

                        {/* Serial Number */}
                        <td className="px-6 py-4 text-gray-400">
                        {indexOfFirst + index + 1}
                        </td>

                        {/* Title */}
                        <td className="px-6 py-4 font-medium text-white group-hover:text-cyan-400 transition">
                        {p.title}
                        </td>

                        {/* Difficulty */}
                        <td className="px-6 py-4">
                        <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                            p.difficultyLevel === "easy"
                                ? "bg-green-500/10 text-green-400"
                                : p.difficultyLevel === "medium"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                        >
                            {level}
                        </span>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 capitalize text-gray-300">
                            {p.category}
                        </td>

                        {/* Status (NEW) */}
                        <td className="px-6 py-4">
                            {solvedProblems?.some(
                                (sp) => sp._id.toString() === p._id.toString()
                            ) ? (
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400">
                                Solved
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-500/10 text-gray-300">
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">

        <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-md border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
            <ChevronLeft size={16} />
            Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
            <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-md border transition ${
                currentPage === i + 1
                ? "border-white/30 bg-white/15 text-white"
                : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
            >
            {i + 1}
            </button>
        ))}

        <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-md border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
            Next
            <ChevronRight size={16} />
        </button>

        </div>
    </div>
    </MainLayout>
);

        


} 