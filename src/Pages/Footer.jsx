import { Link } from "react-router";
import logo from "../CodeBit.png";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 py-16 text-white">

      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.16), transparent 70%)",
        }}
      />
      

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">

        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="h-10 mb-5"
        />

        {/* TAGLINE */}
        <p className="max-w-xl text-sm leading-7 text-slate-300">
          Practice DSA with real interview questions, structured learning,
          AI-powered guidance, and beautiful developer experience.
        </p>

        {/* LINKS */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-300">

          <Link
            to="/about"
            className="transition hover:text-cyan-300"
          >
            About
          </Link>

          <Link
            to="/problems"
            className="transition hover:text-cyan-300"
          >
            Problems
          </Link>

          <Link
            to="/contests"
            className="transition hover:text-cyan-300"
          >
            Contest
          </Link>

          <Link
            to="/interview"
            className="transition hover:text-cyan-300"
          >
            Interview
          </Link>


          <Link
            to="/career"
            className="transition hover:text-cyan-300"
          >
            Careers
          </Link>
        </div>

        {/* SOCIALS */}
        <div className="mt-8 flex items-center gap-4">

          {/* Gmail */}
          <a
            href="mailto:harshiitchouhan12@gmail.com"
            className="rounded-xl border border-white/10 bg-white/4 p-3 text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 
              0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 
              5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/harshit-chouhan-3a0526346/"
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/4 p-3 text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.94 6.5a1.44 1.44 0 1 
              1 0-2.88 1.44 1.44 0 0 1 
              0 2.88zM4 8h6v12H4V8zm8 
              0h5.5c3 0 4.5 1.6 4.5 
              4.6V20h-6v-6.4c0-1.5-.5-2.6-1.9-2.6-1 
              0-1.6.7-1.9 1.4-.1.3-.1.7-.1 
              1.1V20h-6V8z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/harshiitchouhan"
            target="_blank"
            className="rounded-xl border border-white/10 bg-white/4 p-3 text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.38-3.87-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.47.12-3.06 0 0 .98-.31 3.2 1.18A11.1 11.1 0 0 1 12 6.04c.99 0 1.98.13 2.91.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.59.24 2.76.12 3.06.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-12 w-full border-t border-white/10 pt-6">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CodeBit. All rights reserved.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Blending functionality with beautiful UI to build seamless digital experiences.
          </p>
        </div>
      </div>
    </footer>
  );
}