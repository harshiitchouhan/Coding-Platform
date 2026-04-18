export default function Authloader (){
    return(
<div className="min-h-screen w-full relative bg-black overflow-hidden">

  {/* Background Glow */}
  <div
    className="absolute inset-0 z-0"style={{background:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(99, 102, 241, 0.12), transparent 60%), #000000",}}
  />

  {/* Blur Layer */}
  <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_45%)]" />

  {/* Content */}
  <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4 relative z-20">

    <span className="text-xl text-white font-semibold drop-shadow-lg">
        Loading CodeBit...
    </span>

    <div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin z-10"></div>

  </div>

</div>
    )
}