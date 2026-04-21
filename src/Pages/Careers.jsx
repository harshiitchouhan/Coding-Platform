import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Careers() {
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
            Join CodeBit 
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            We’re building the future of DSA learning — and we’re just getting started.
          </p>
        </section>

        {/* WHY JOIN */}
        <section className="mt-20 px-6 md:px-16 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why Work With Us?
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Real Impact</h3>
              <p className="text-gray-400 text-sm mt-3">
                Help thousands of students improve their problem-solving skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Learn & Grow</h3>
              <p className="text-gray-400 text-sm mt-3">
                Work on real-world features like AI, system design, and scalable apps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-cyan-300 font-semibold">Builder Mindset</h3>
              <p className="text-gray-400 text-sm mt-3">
                Be part of building a product from the ground up.
              </p>
            </div>

          </div>
        </section>

        {/* ROLES */}
        <section className="mt-24 px-6 md:px-16 max-w-5xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Open Roles
          </h2>

          <div className="mt-10 space-y-6 ">

            {/* Role 1 */}
            <div className="p-6 hover:scale-105 transition ease-in rounded-2xl bg-white/5 border hover:border-blue-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300">
                  Frontend Developer (React)
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Work on UI/UX and build beautiful, responsive interfaces.
                </p>
              </div>

              <button className="px-5 py-2 rounded-lg bg-cyan-400 text-black font-medium hover:bg-cyan-300 transition">
                Coming Soon!
              </button>
            </div>

            {/* Role 2 */}
            <div className="p-6 hover:scale-105 transition ease-in rounded-2xl bg-white/5 border hover:border-blue-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300">
                  Backend Developer
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Build APIs, handle database, and scale the platform.
                </p>
              </div>

              <button className="px-5 py-2 rounded-lg bg-cyan-400 text-black font-medium hover:bg-cyan-300 transition">
                Coming Soon!
              </button>
            </div>

            {/* Role 3 */}
            <div className="p-6 hover:scale-105 transition ease-in rounded-2xl bg-white/5 border hover:border-blue-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300">
                  Content Creator (DSA)
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  Write editorials and create structured problem explanations.
                </p>
              </div>

              <button className="px-5  py-2 rounded-lg bg-cyan-400 text-black font-medium hover:bg-cyan-300 transition">
                Coming Soon!
              </button>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="mt-24 mb-24 px-6 md:px-16 text-center">

          <div className="max-w-3xl  mx-auto p-10 rounded-3xl bg-white/5 border border-white/10">

            <h2 className="text-3xl md:text-4xl font-semibold">
              Don’t see a role that fits? 👀
            </h2>

            <p className="text-gray-400 mt-4">
              If you’re passionate about building and learning, we’d still love to hear from you.
            </p>

            <div className="mt-8">
              <a
                href="mailto:harshiitchouhan12@gmail.com"
                className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
              >
                Reach Out
              </a>
            </div>

          </div>

        </section>

        <Footer />
      </div>
    </div>
  );
}