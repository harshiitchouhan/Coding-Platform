import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function MainLayout({ children, showFooter = true, showNavbar=true }) {
  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.25), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {showNavbar && <Navbar />}

        <main className="grow">
          {children ? children : <Outlet />}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
}