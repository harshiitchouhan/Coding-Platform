import { Link } from "react-router";
import logo from "../CodeBit.png";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-md text-white py-16">

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">

        {/* LOGO */}
        <img src={logo} alt="logo" className="h-10 mb-4" />

        {/* TAGLINE */}
        <p className="text-gray-300 text-md max-w-md">
          Practice DSA with real interview questions and Structured learning.
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-8 mt-8 text-gray-300 text-md">
          
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>

          <Link to="/problems" className="hover:text-white transition">
            Problems
          </Link>

          <Link to="/interview" className="hover:text-white transition">
            Interview
          </Link>

          <Link to="/career" className="hover:text-white transition">
            Careers
          </Link>

          
        </div>

        {/* SOCIALS */}
        <div className="flex gap-6 mt-6">
          {/* Gmail */}
          <a href="mailto:harshiitchouhan12@gmail.com">
            <svg className=" mt-1 w-7 h-7 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 
              0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 
              5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/harshit-chouhan-3a0526346/" target="_blank">
            <svg className="w-8 h-8 text-gray-400 hover:text-white transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.94 6.5a1.44 1.44 0 1 
              1 0-2.88 1.44 1.44 0 0 1 
              0 2.88zM4 8h6v12H4V8zm8 
              0h5.5c3 0 4.5 1.6 4.5 
              4.6V20h-6v-6.4c0-1.5-.5-2.6-1.9-2.6-1 
              0-1.6.7-1.9 1.4-.1.3-.1.7-.1 
              1.1V20h-6V8z"/>
            </svg>
          </a>
        </div>

        {/* BOTTOM TEXT */}
        <div className="mt-10 pt-6 border-t border-white/10 w-full">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CodeBit 
          </p>

          <p className="mt-2 md:mt-0 text-slate-300">
          Blending functionality with beautiful UI to build seamless digital experiences.
          </p>
        </div>

      </div>
    </footer>
  );
}