import { motion } from "framer-motion";
import { IoSparkles } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pt-26">
      {/* 1. Animated Background Blobs (The "Engine" of the glass effect) */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />

      {/* 2. The Glass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full md:p-16 rounded-[2.5rem] 
                   backdrop-blur-xl bg-slate-900/60
                   shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="neon-border inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
            <IoSparkles size={18} className="text-yellow-400" />
            <span>Open for collaboration</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-tight">
            Engineer. Scale.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Elevate.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Building intelligent,{" "}
            <span className="text-white">multi-agent AI platforms</span> using
            <span className="text-white"> agentic frameworks</span> and
            <span className="text-white"> cloud-native technologies </span>-
            automating workflows, scaling reliably, and delivering measurable
            impact.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {/* Liquid Wave Hero Button with Trailing Particles */}
            <button
              onClick={() => scrollToSection("contact")}
              className="group relative h-14 w-64 rounded-full bg-white border border-white/20 shadow-[0_10px_30px_rgba(6,182,212,0.15),_0_4px_10px_rgba(99,102,241,0.1)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-500 cursor-pointer overflow-hidden flex items-center"
            >
              {/* ROUNDED LIQUID EXPANSION: Expands circularly from the starting point */}
              <div className="absolute top-1 left-1 h-11 w-11 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 scale-100 origin-center group-hover:scale-[6] transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] -z-10" />

              {/* GPU-ACCELERATED TRAILING PARTICLES (Built into the sliding framework) */}
              {/* Particle 1: Small quick float */}
              <span className="absolute top-3 left-6 h-1 w-1 rounded-full bg-cyan-300 opacity-0 pointer-events-none transition-all duration-[800ms] ease-out group-hover:left-36 group-hover:top-2 group-hover:opacity-100 group-hover:scale-150 z-10" />

              {/* Particle 2: Centred delayed float */}
              <span className="absolute top-7 left-6 h-1.5 w-1.5 rounded-full bg-indigo-300 opacity-0 pointer-events-none transition-all duration-[1000ms] delay-100 ease-out group-hover:left-44 group-hover:top-9 group-hover:opacity-80 group-hover:scale-110 z-10" />

              {/* Particle 3: Bottom deep trailing drop */}
              <span className="absolute bottom-3 left-6 h-1 w-1 rounded-full bg-purple-300 opacity-0 pointer-events-none transition-all duration-[1100ms] delay-700 ease-out group-hover:left-48 group-hover:bottom-2 group-hover:opacity-90 z-10" />

              {/* THE CIRCLE: Slides smoothly on top of the particles */}
              <div className="absolute top-1 left-1 h-11 w-11 rounded-full bg-indigo-600 text-white flex items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:left-[calc(100%-3rem)] group-hover:bg-slate-900 shadow-md z-20">
                <FaArrowRight className="text-md text-white group-hover:text-indigo-600 transition-colors duration-500" />
              </div>

              {/* Text Core Layer Elements */}
              <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
                {/* Text State 1: Idle (Disappears cleanly beneath the advancing circle) */}
                <span className="absolute right-[20%] text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-700 transition-all duration-[500ms] ease-out opacity-100 group-hover:opacity-0 group-hover:translate-x-4">
                  Let's Talk
                </span>

                {/* Text State 2: Hovered (Reveals beautifully post-liquid burst) */}
                <span className="absolute left-8 text-lg font-black tracking-wide text-white transition-all duration-[800ms] delay-[400ms] ease-out opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
                  Get in Touch
                </span>
              </div>
            </button>

            {/* <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
              <GithubLogo weight="bold" className="mr-2" /> My GitHub
            </Button> */}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Floating Phosphor Icons */}
      <FloatingIcon
        icon={<FaCode className="text-gray-400" size={48} />}
        position="top-[20%] left-[15%]"
        delay={0}
      />
      <FloatingIcon
        icon={<SiGooglecloud className="text-blue-800" size={40} />}
        position="bottom-[30%] right-[15%]"
        delay={1}
      />
    </section>
  );
}

function FloatingIcon({
  icon,
  position,
  delay,
}: {
  icon: React.ReactNode;
  position: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute hidden lg:block ${position}`}
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {icon}
    </motion.div>
  );
}
