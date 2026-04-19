import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
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
        <main className="grow px-6 md:px-16 pt-24 pb-10">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}