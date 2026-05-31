import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaGraduationCap, FaHandshake } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";


const roadmap = [
  {
    year: "2020-2024",
    title: "Computer Science & Engineering, IIIT SriCity",
    desc: "Deep-diving into algorithms and web systems.",
    icon: <FaGraduationCap size={24} />,
    side: "left",
  },
  {
    year: "Oct, 2024 - Dec, 2025",
    title: "Senior Analyst, Capgemini",
    desc: "Discovering Gen AI and GCP services",
    icon: <FaHandshake size={24} />,
    side: "right",
  },
  {
    year: "Jan, 2026-Present",
    title: "Associate Consultant, Capgemini",
    desc: "Built multi-agent AI accelrator for data pipelines.",
    icon: <GiStairsGoal size={24} />,
    side: "left",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress for the particle movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Transform the progress (0 to 1) into a pathLength (0 to 1)
  const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-slate-950 overflow-hidden"
    >
        <div className="max-w-5xl mx-auto px-6 text-center mb-10">
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">
            The <span className="text-blue-500">Journey</span>
          </h2>
          <p className="text-slate-400 mt-4 font-medium italic">
            Tracing the path from logic to digital art.
          </p>
        </div>
      <div className="max-w-4xl mx-auto px-6 relative">
        
        {/* --- ANIMATED SVG PATH --- */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] hidden md:block pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            {/* Background Path (Dim) */}
            <path
              d="M 50 0 C 50 100, 10 150, 10 250 C 10 350, 90 400, 90 500 C 90 600, 50 650, 50 800"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeOpacity="0.05"
            />
            {/* The "Glow" Path (Drawn on scroll) */}
            <motion.path
              style={{ pathLength }}
              d="M 50 0 C 50 100, 10 150, 10 250 C 10 350, 90 400, 90 500 C 90 600, 50 650, 50 800"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* --- MILESTONES --- */}
        <div className=" space-y-32 relative">
          {roadmap.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex items-center justify-between w-full ${
                item.side === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Glassmorphic Milestone Card */}
              <div className="w-full md:w-[45%] group">
                <div className="relative p-8 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 hover:border-blue-500/30 transition-colors duration-500 overflow-hidden shadow-2xl">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                        <span className="text-blue-400 group-hover:text-cyan-400 transition-colors">
                          {item.icon}
                        </span>
                      </div>
                      <span className="text-xs font-black text-blue-500 uppercase tracking-widest">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>

              {/* The Pulse Point on the path */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                <motion.div
                  whileInView={{ scale: [0.8, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6]"
                />
              </div>

              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
