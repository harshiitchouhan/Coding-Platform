import Navbar from "./Navbar";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden text-white">

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="px-6 md:px-16 pt-24 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-cyan-300 via-sky-400 to-fuchsia-500 text-transparent bg-clip-text">
            CodeBit: Sharpening the World's Coders
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            Not just another DSA platform — CodeBit is built from a student's perspective,
            for students who are trying to break into tech.
          </p>
        </section>

        {/* WHY MADE */}
        <section className="mt-20 px-6 md:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why CodeBit was Created
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            While preparing for placements, I realized that most platforms either
            overwhelm beginners or don’t explain concepts deeply enough.
            Random practice without direction leads to frustration.
            <br /><br />
            CodeBit was created to solve this — a platform where learning is structured,
            explanations are clear, and progress actually feels meaningful.
          </p>
        </section>

        {/* WHO IT'S FOR */}
        <section className="mt-20 px-6 md:px-16 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Who is CodeBit for?
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Beginners</h3>
              <p className="text-gray-400 text-sm mt-3">
                Starting DSA and need a clear roadmap.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Intermediate Learners</h3>
              <p className="text-gray-400 text-sm mt-3">
                Want to strengthen problem-solving skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Placement Aspirants</h3>
              <p className="text-gray-400 text-sm mt-3">
                Preparing for top tech company interviews.
              </p>
            </div>

          </div>
        </section>

        {/* FOUNDER */}
        <section className="mt-24 px-6 md:px-16 max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold">
            Meet the Founder 
          </h2>

          <div className="mt-10 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">

            <p className="text-lg text-gray-300">
              Hi, I’m <span className="text-cyan-300 font-semibold">Harshit Chouhan</span> 
            </p>

            <p className="mt-4 text-gray-400 leading-relaxed">
              A B.Tech student passionate about problem solving, development,
              and building meaningful products.
              <br /><br />
              CodeBit started as a personal project to improve my own DSA journey,
              but quickly turned into something bigger — a platform to help others
              learn in a better and more structured way.
            </p>

          </div>

        </section>

        {/* MISSION */}
        <section className="mt-24 px-6 md:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Our Mission 
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            To make DSA learning simple, structured, and effective —
            so that every student, regardless of their background,
            can crack top tech interviews with confidence.
          </p>
        </section>

        {/* FUTURE GOALS */}
        <section className="mt-24 mb-24 px-6 md:px-16 max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold">
            Future Goals 
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">AI Assistance</h3>
              <p className="text-gray-400 text-sm mt-3">
                Smart hints and explanations powered by AI.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Video Solutions</h3>
              <p className="text-gray-400 text-sm mt-3">
                Visual explanations for better understanding.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Full Learning Path</h3>
              <p className="text-gray-400 text-sm mt-3">
                Complete roadmap from beginner to advanced.
              </p>
            </div>

          </div>

        </section>

        <Footer />
      </div>
    </div>
  );
}