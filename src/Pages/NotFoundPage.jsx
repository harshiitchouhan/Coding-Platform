export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-30 left-1/2 -translate-x-1/2 -h-105 -w-175 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute -bottom-25 -right-15 h-75 w-75 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="absolute top-[45%] -left-20 h-65 w-65 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08),transparent_45%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        {/* 404 */}
        <div className="relative inline-block mb-6">
          <h1 className="text-[110px] sm:text-[150px] md:text-[180px] font-black leading-none tracking-tight bg-linear-to-b from-cyan-300 via-cyan-400 to-cyan-700 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.25)]">
            404
          </h1>

          <div className="absolute inset-0 blur-3xl opacity-30 bg-cyan-400/20 rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
          Lost In The Void Of Code
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          The page you’re trying to access doesn’t exist, was moved,
          or never compiled into reality.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-7 py-3 font-medium text-cyan-300 transition-all hover:-translate-y-1 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <span className="relative z-10">Return Home</span>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-cyan-400/5 blur-2xl" />
          </a>

          <a
            href="/problems"
            className="rounded-2xl border border-white/10 bg-white/5 px-7 py-3 font-medium text-gray-300 transition-all hover:-translate-y-1 hover:bg-white/10 hover:text-white"
          >
            Solve Problems
          </a>
        </div>

        {/* Tiny Footer */}
        <p className="mt-14 text-xs tracking-[0.25em] uppercase text-gray-500">
          CodeBit • Page Not Found
        </p>
      </div>
    </div>
  );
}
