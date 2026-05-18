export default function Spinner(text="Loading...") {
  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden flex items-center justify-center text-white">

      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.28), transparent 70%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.22), transparent 70%), #000000",
        }}
      />

      {/* Moving Glow Orbs */}
      <div className="absolute top-24 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[46px_46px]" />

      {/* Main Loader Card */}
      <div className="relative z-20 flex flex-col items-center gap-7 px-10 py-12 rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.15)]">

        {/* Logo Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">

          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />

          <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-cyan-400 border-r-indigo-400 animate-spin" />

          <div className="absolute inset-3 rounded-full border border-cyan-300/20 shadow-[0_0_30px_rgba(34,211,238,0.5)]" />

          
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            {text}
          </h1>

          
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-[loaderMove_1.4s_ease-in-out_infinite]" />
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
          <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce delay-150" />
          <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-300" />
        </div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes loaderMove {
            0% {
              transform: translateX(-120%);
            }
            50% {
              transform: translateX(80%);
            }
            100% {
              transform: translateX(220%);
            }
          }
        `}
      </style>
    </div>
  );
}