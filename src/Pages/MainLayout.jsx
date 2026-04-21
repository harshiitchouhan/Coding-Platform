import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children , showFooter = true }) {
  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden text-white">

      {/* Background Glow (same as homepage) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.25), transparent 70%)",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="grow">
          {children}
        </main>

        {/* Footer */}
        {showFooter && <Footer />}

      </div>
    </div>
  );
}