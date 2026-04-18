import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer"

function HomePage() {
  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden">

      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(56, 189, 248, 0.22), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(99, 102, 241, 0.15), transparent 60%), radial-gradient(ellipse 60% 40% at 20% 90%, rgba(99, 102, 241, 0.12), transparent 60%), #000000",
        }}
      />

      {/* Blur Layer */}
      <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.08),transparent_45%)]" />

      {/* Content Layer */}
      <div className="relative z-10">

            {/* Navbar */}
            <Navbar />

            {/* Hero */}
            <div className="pt-16">
              <Hero />
            </div>

            {/* Footer */}
            <Footer />

      </div>
    </div>
  );
}

export default HomePage;