export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">

      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 35%), radial-gradient(circle at bottom, rgba(99,102,241,0.18), transparent 35%), #000",
        }}
      />

      {/* Blur Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Loader */}
      <div className="relative w-28 h-28 flex items-center justify-center">

        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" />

        {/* Main Rotating Ring */}
        <div className="absolute inset-0 rounded-full border-[5px] border-white/10 border-t-cyan-400 border-r-indigo-500 animate-spin" />

        {/* Inner Rotating Ring */}
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-cyan-300 border-l-blue-500 animate-[spin_2s_linear_infinite_reverse]" />

        {/* Center Glow */}
        <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.9)] animate-pulse" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[40px_40px]" />
    </div>
  );
}