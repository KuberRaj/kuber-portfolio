import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaHandshake } from "react-icons/fa6";
import { GiStairsGoal } from "react-icons/gi";

const initialCards = [
  {
    id: "associate",
    year: "Jan, 2026 - Present",
    title: "Associate Consultant, Capgemini",
    desc: "Built multi-agent AI accelerator for enterprise data pipelines. Optimizing high-throughput system modules and integrating secure LLM orchestrators.",
    icon: <GiStairsGoal size={26} />,
    company: "Capgemini",
    tech: [
      "Python",
      "Multi-Agent Systems",
      "Gen AI",
      "Agentic AI",
      "Google ADK",
      "Docker"
    ],
  },
  {
    id: "senior",
    year: "Oct, 2024 - Dec, 2025",
    title: "Senior Analyst, Capgemini",
    desc: "Discovering Gen AI and GCP services. Architected cloud-native microservices and designed automated deployment strategies.",
    icon: <FaHandshake size={26} />,
    company: "Capgemini",
    tech: ["GCP", "Generative AI", "Cloud Architecture", "Flask", "React"],
  },
  {
    id: "education",
    year: "2020-2024",
    title: "Computer Science & Engineering, IIIT SriCity",
    desc: "Deep-diving into algorithms and AI/ML. Explored data structures, concurrent programming architectures, and full-stack engineering design patterns.",
    icon: <FaGraduationCap size={26} />,
    company: "IIIT SriCity",
    tech: ["Algorithms", "AI/ML", "Computer Science", "React", "Node.js"],
  },
];

export default function About() {
  const [cards, setCards] = useState(initialCards);

  const rotateDeck = () => {
    setCards((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      if (first) updated.push(first);
      return updated;
    });
  };

  return (
    <section className="min-h-screen bg-slate-950 flex flex-col items-center justify-center py-20 px-4 overflow-hidden relative select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 opacity-40 pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
          The <span className="text-blue-500">Journey</span>
        </h2>
        <p className="text-slate-400 mt-2 text-sm md:text-base font-medium italic">
          Engineering intelligence, layer by layer
        </p>
      </div>

      <div className="relative w-full max-w-2xl h-[480px] md:h-[520px] flex items-center justify-center [perspective:2000px] [transform-style:preserve-3d]">
        <AnimatePresence mode="popLayout">
          {cards.map((item, index) => {
            const depth = index;
            const isTop = index === 0;

            const xOffset = depth * -75;
            const yOffset = depth * 70;
            const zOffset = depth * -160;

            const scaleOffset = 1 - depth * 0.05;
            const opacityOffset = 1 - depth * 0.22;

            return (
              <motion.div
                key={item.id}
                style={{
                  transformOrigin: "bottom left",
                  transformStyle: "preserve-3d",
                  zIndex: 20 - depth,
                }}
                initial={
                  isTop
                    ? false
                    : {
                        opacity: 0,
                        x: xOffset,
                        y: yOffset,
                        z: zOffset,
                        scale: scaleOffset,
                      }
                }
                animate={{
                  x: xOffset,
                  y: yOffset,
                  z: zOffset,
                  scale: scaleOffset,
                  opacity: opacityOffset,
                  rotateX: isTop ? 0 : 8,
                  rotateY: isTop ? 0 : 10,
                  rotateZ: isTop ? 0 : 2,
                  filter: `blur(${depth * 0.7}px)`,
                }}
                exit={{
                  x: -150,
                  y: -100,
                  z: 400,
                  rotateX: -20,
                  rotateY: 25,
                  opacity: 0,
                  transition: { duration: 0.45, ease: "easeOut" },
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                }}
                whileTap={isTop ? { scale: 0.97 } : {}}
                onClick={() => {
                  if (isTop) rotateDeck();
                }}
                className="absolute w-full max-w-[92vw] md:max-w-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.85)] border cursor-pointer group"
              >
                <motion.div
                  animate={
                    isTop
                      ? {
                          boxShadow: [
                            "0 20px 60px rgba(255,255,255,0.2), 0 0 0px rgba(59,130,246,0.3)",
                            "0 40px 120px rgba(255,255,255,0.4), 0 0 60px rgba(59,130,246,0.5)",
                            "0 20px 60px rgba(255,255,255,0.2), 0 0 0px rgba(59,130,246,0.3)",
                          ],
                        }
                      : {}
                  }
                  whileHover={{
                    rotateX: -4,
                    rotateY: 6,
                    scale: 1.02,

                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`w-full h-full rounded-[3rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-3xl border transition-colors duration-500
                    ${
                      isTop
                        ? "bg-slate-900/60 border-blue-500/40 hover:border-white/60"
                        : "bg-white/8 border-white/20 pointer-events-none"
                    }
                  `}
                >
                  {/* Back glass tint */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

                  {/* Mid layer diffusion */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-40" />

                  {/* Top glass highlight */}
                  {/* {isTop && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-cyan-200/10 opacity-70 pointer-events-none" />
                  )} */}

                  {isTop && (
                    <div className="absolute -inset-10 bg-blue-400/20 blur-3xl opacity-30 pointer-events-none" />
                  )}

                  {/* Glass reflection */}
                  {/* <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/30 pointer-events-none" /> */}
                  

                  {/* Rim outline */}
                  <div className="absolute inset-0 rounded-[3rem] border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-5">
                          <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                          <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                            {item.icon}
                          </span>
                        </div>
                          <div>
                          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                            {item.year}
                          </span>
                          <div className="text-sm font-semibold text-slate-300">
                            {item.company}
                          </div>
                        </div>
                        </div>

                        <span className="text-4xl font-black text-white/10 font-mono select-none">
                          //0
                          {initialCards.findIndex((c) => c.id === item.id) + 1}
                        </span>
                      </div>

                     <div>
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/40">
                      <span className="text-[12.5px] font-black text-cyan-100 uppercase tracking-wider block mb-2">
                        Technologies deployed
                      </span>

                      <div className="mt-6 flex flex-wrap gap-2">
                      {item.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs bg-slate-950 border border-white text-cyan-300 font-medium tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
