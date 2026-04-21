import { Link } from "react-router"

export default function Hero(){

    return(
        <>

        {/* Left And Right Divs */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-16 md:pt-20 gap-12">
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-linear-to-r from-cyan-300 via-sky-400 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]">
            Master DSA by Practicing Real Problems With CodeBit
          </h1>

          <p className="text-gray-400 text-xl max-w-md">
            Learn Data Structures & Algorithms with interactive problems,
            visual intuition, and structured practice.
          </p>

          <div className="flex gap-4">
            <Link
                to="/problems"
                className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold 
                hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
                Start Solving
            </Link>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 grid grid-cols-2 gap-6">

        {/* ARRAY */}
        <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md 
        flex flex-col items-center justify-center text-center
        hover:scale-110 hover:border-cyan-400/40 transition-all duration-300">

            <h3 className="text-cyan-300 font-semibold text-lg">
            Arrays
            </h3>

            <p className="text-gray-300 text-xs mt-2">
            Sliding Window • Two Pointers • Binary Search
            </p>

            <div className="mt-2 text-gray-400 text-sm font-mono">
            Optimization Patterns
            </div>
        </div>

        {/* LINKED LIST */}
        <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md 
        flex flex-col items-center justify-center text-center
        hover:scale-110 hover:border-purple-400/40 transition-all duration-300">

            <h3 className="text-cyan-300 font-semibold text-lg">
            Linked List
            </h3>

            <p className="text-gray-300 text-xs mt-2">
            Reverse • Cycle Detection • Middle
            </p>

            <div className="mt-2 text-gray-400 text-sm font-mono">
                Pointer Manipulation
            </div>
        </div>

    {/* TREE */}
        <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md 
        flex flex-col items-center justify-center text-center
        hover:scale-110 hover:border-green-400/40 transition-all duration-300">

            <h3 className="text-cyan-300 font-semibold text-lg">
            Trees
            </h3>

            <p className="text-gray-300 text-xs mt-2">
            DFS • BFS • Traversals
            </p>

            <div className="mt-2 text-gray-400 text-sm font-mono">
            Recursive Structures
        </div>
    </div>

    {/* GRAPH */}
    <div className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md 
    flex flex-col items-center justify-center text-center
    hover:scale-110 hover:border-pink-400/40 transition-all duration-300">

        <h3 className="text-cyan-300 font-semibold text-lg">
        Graphs
        </h3>

        <p className="text-gray-300 text-xs mt-2">
        Spanning Trees • Shortest Path
        </p>

        <div className="my-2 text-gray-400 text-sm font-mono">
        Node Connectivity
        </div>
    </div>

    </div>

        </div>

        {/* //Companies Konsi Konsi Hai Jo Ise Sawal Poochti Hai */}

        {/* Hero Body */}
        <div>

            <div className="flex justify-center">
            <h2 className="md:text-5xl text-3xl font-semibold mt-24 text-center text-white">
            Practice with Real Interview Questions From
            </h2>

            </div>

            {/* Companies Of Codebit */}
            <div className="flex flex-wrap justify-center gap-16 md:gap-20 lg:gap-28 mt-8 md:mt-12 text-white font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans">

            <span className="hover:bg-linear-to-r hover:from-fuchsia-400 hover:via-sky-400 hover:to-cyan-500 
                hover:text-transparent hover:bg-clip-text 
                hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]
                transition-all duration-300 cursor-pointer">
                Google
            </span>

            <span className="hover:bg-linear-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-fuchsia-500 
                hover:text-transparent hover:bg-clip-text 
                hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]
                transition-all duration-300 cursor-pointer">
                Amazon
            </span>

            <span className="hover:bg-linear-to-r hover:from-fuchsia-400 hover:via-sky-400 hover:to-cyan-500 
                hover:text-transparent hover:bg-clip-text 
                hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]
                transition-all duration-300 cursor-pointer">
                Netflix
            </span>

            <span className="hover:bg-linear-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-fuchsia-500 
                hover:text-transparent hover:bg-clip-text 
                hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]
                transition-all duration-300 cursor-pointer">
                Accenture
            </span>

            <span className="hover:bg-linear-to-r hover:from-fuchsia-400 hover:via-sky-400 hover:to-cyan-500 
                hover:text-transparent hover:bg-clip-text 
                hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]
                transition-all duration-300 cursor-pointer">
                Coforge
            </span>

            <span className="hover:bg-linear-to-r hover:from-cyan-300 hover:via-sky-400 hover:to-fuchsia-500 
                hover:text-transparent hover:bg-clip-text 
                hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.25)]
                transition-all duration-300 cursor-pointer">
                Mahindra
            </span>

            </div>

            {/* Working oF Codebit */}
            <div className="mt-24 px-6 md:px-16 mb-20 text-white">

                <h2 className="text-center text-3xl md:text-5xl font-semibold bg-clip-text">
                    How CodeBit Works
                </h2>

                <div className="mt-14 grid md:grid-cols-3 gap-6">

                    {/* Step 1 */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center transition-all duration-300 hover:scale-105  hover:border-pink-400/50  hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]">
                    <h3 className="text-cyan-300 text-lg font-semibold">Pick a Topic</h3>
                    <p className="text-gray-300 text-sm mt-3">
                        Arrays, Graphs, Trees, DP and more
                    </p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center transition-all duration-300 hover:scale-105  hover:border-yellow-400/50  hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                    <h3 className="text-cyan-300 text-lg font-semibold">Solve Problems</h3>
                    <p className="text-gray-300 text-sm mt-3">
                        Practice real interview questions
                    </p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                    <h3 className="text-cyan-300 text-lg font-semibold">Track Progress</h3>
                    <p className="text-gray-300 text-sm mt-3">
                        Improve step by step with insights
                    </p>
                    </div>

                </div>

            </div>


            {/* Again CTA to Start PRoblems */}
            <div className="mt-24 px-6 md:px-16 mb-24 text-white">

                <div className="max-w-4xl mx-auto text-center p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.05] hover:border-cyan-400/40 
                                hover:shadow-[0_10px_40px_rgba(56,189,248,0.25)]">

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-semibold">
                    Ready to crack your dream company? 
                    </h2>

                    {/* Hinglish Line */}
                    <p className="text-gray-400 mt-4 text-lg">
                    Offer chahiye Google, Amazon jaisi companies se?  
                    Toh ab sirf dekhna band karo — practice shuru karo aur apna DSA solid banao 
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                    <Link
                        to="/problems"
                        className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold 
                        hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    >
                         Start Solving
                    </Link>

                    </div>

                </div>

            </div>

        </div>

</>

)}