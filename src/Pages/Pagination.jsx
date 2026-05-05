import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
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
  );
}