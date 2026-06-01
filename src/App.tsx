import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certifications from "./components/Certifications";
import StarFall from "./components/StarFall";
import { SkillSnapshot } from "./components/SkillSnapshot";
import { FiDownload } from "react-icons/fi";
import { LuScanSearch } from "react-icons/lu";
import { FaMailBulk } from "react-icons/fa";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import React from 'react';
// import { motion } from 'framer-motion';
// import React from "react";
import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { ResumeModal } from "./components/ResumeModal";

type SocialItem = {
  icon: React.ElementType;
  color: string;
  hoverShadow: string;
  label: string;
  href: string;
};

const items: SocialItem[] = [
  {
    icon: FaLinkedinIn,
    color: "#1e90ff",
    hoverShadow: "hover:shadow-[0px_10px_10px_#1e90ff]",
    label: "LinkedIn",
    href: "https://linkedin.com/in/kuber-raj-kunal",
  },
  {
    icon: SiGmail,
    color: "#0bd6f6",
    hoverShadow: "hover:shadow-[0px_10px_10px_#0bd6f6]",
    label: "Gmail",
    href: "mailto:krk2000raj@gmail.com",
  },
  {
    icon: FaGithub,
    color: "#9bb8f7",
    hoverShadow: "hover:shadow-[0px_10px_10px_#9bb8f7]",
    label: "GitHub",
    href: "https://github.com/KuberRaj",
  },
  {
    icon: FaWhatsapp,
    color: "#25D366",
    hoverShadow: "hover:shadow-[0px_10px_10px_#25D366]",
    label: "WhatsApp",
    href: "https://wa.me/91637149030?text=Hi%20Kunal%2C%20I%20came%20across%20your%20portfolio",
  },
];

const SocialButtons: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {items.map(({ icon: Icon, color, hoverShadow, label, href }) => (
        <div
          key={label}
          className={`group mx-[5px] flex h-[50px] w-[50px] items-center justify-center rounded-[5px]
            [transform-style:preserve-3d] rounded-full
            shadow-[inset_1px_1px_2px_#fff,0_0_5px_#4442]
            transition-all duration-300
            [transition-timing-function:cubic-bezier(0.68,0.85,0.265,1.85)]
            hover:bg-white
            hover:scale-110
            hover:[transform:perspective(180px)_rotateX(60deg)_translateY(2px)]
            ${hoverShadow}`}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full cursor-pointer items-center justify-center border-none bg-transparent text-[20px]
              transition-all duration-500
              [transition-timing-function:cubic-bezier(0.68,-0.85,0.265,1.55)]
              group-hover:[transform:translate3d(0px,20px,30px)_perspective(80px)_rotateX(-60deg)_translateY(2px)_translateZ(10px)]"
          >
            <Icon style={{ color }} />
          </a>
        </div>
      ))}
    </div>
  );
};

// export default SocialButtons;
const BubbleBackground = () => {
  return (
    <div className="area">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

// export default BubbleBackground;

// export default BubbleBackground;

const IntroCard = ({ onShowResume }: { onShowResume: () => void }) => {
  const [showBottomBar, setShowBottomBar] = useState(false);

  const calculateExperience = (startDate: string) => {
    const start = new Date(startDate);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  const experience = calculateExperience("2024-10-01");
  const navigate = useNavigate();

  const formatExperience = () => {
    const { years, months } = experience;

    if (years === 0) {
      return `${months} Mos`;
    }

    if (months === 0) {
      return `${years}+ Yrs`;
    }

    return `${years} Yr${years > 1 ? `s` : ""} ${months} Mos`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 flex items-center justify-center min-h-screen overflow-hidden"
    >
      <div className="scale-[0.65] sm:scale-[0.8] md:scale-100 origin-center">
        {/* The Optimized Glass Card (Smaller Container) */}
        <div className="group relative w-full max-w-3xl">
          {/* Animated Border Glow Effect */}
          <div
            className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-[32px] blur-sm group-hover:via-blue-400/60 transition-all duration-500 animate-[pan_5s_linear_infinite]"
            style={{ backgroundSize: "200% 100%" }}
          />

          <button
            onClick={() => setShowBottomBar((prev) => !prev)}
            className="absolute cursor-pointer top-4 right-4 z-20 flex items-center justify-center text-blue-400 hover:scale-110 hover:text-blue-300 transition-all duration-300"
          >
            <FaMailBulk size={24} />
          </button>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:bg-slate-900/60">
            <BubbleBackground />
            {/* Subtle Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.5] pointer-events-none bg-[url('https://vercel.app')]" />

            <div className="relative z-10 flex flex-row items-center justify-between p-8 md:p-12 gap-8">
              {/* Left Side: Typography */}
              <div className="flex-1 space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full border border-blue-400/20 bg-blue-400/10 text-yellow-200 text-xs font-bold tracking-widest uppercase">
                  Currently @ Capgemini
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Hello, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-indigo-300">
                    I'm Kuber
                  </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-md leading-relaxed font-light">
                  {/* Digital Craftsman creating Ghibli-inspired</span> interfaces with modern tech stacks. */}
                  Artisan crafting{" "}
                  <span className="text-blue-400">
                    intelligent, GenAI & agentic AI applications
                  </span>{" "}
                  with modern tech stacks.
                </p>

                <div className="flex flex-row justify-between gap-3 w-full max-w-md mx-auto md:mx-0">
                  <button
                    onClick={() => navigate("/kuber")}
                    className="px-8 py-3 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
                  >
                    <LuScanSearch size={20} />
                    Explore Portfolio
                  </button>
                  <div
                    onClick={onShowResume}
                    className="px-8 py-3 cursor-pointer border border-white/10 text-white rounded-full font-medium backdrop-blur-md flex items-center gap-2"
                  >
                    <FiDownload size={20} />
                    Resume
                  </div>
                </div>
              </div>

              {/* Right Side: Ghibli Avatar with Glow Ring */}
              <div className="relative group-hover:scale-105 transition-transform duration-700">
                {/* Outer Glow Ring */}

                <div className="absolute -inset-4 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />

                {/* Image Container */}
                <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-[6px] border-white/10 shadow-2xl">
                  <img
                    src="/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-7 -right-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-3 md:p-4 rounded-2xl shadow-xl">
                  <div className="text-neutral-900 text-[13px] font-extrabold uppercase">
                    Availability
                  </div>
                  <div className="text-green-400 text-[14px] font-semibold flex items-center gap-1.5">
                    <span className="neon-border w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    Open for Opportunities
                    {/* <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> */}
                    {/* Heads Down */}
                    {/* dangling string + swinging experience tag */}
                    <div className="absolute left-[7.5%] md:left-[10.5%] top-[60%] animate-swing pointer-events-none flex flex-col items-center">
                      {/* Hinge Point (The "Nail") */}
                      <div className="w-1 h-1 rounded-full mb-[-1px]"></div>

                      {/* String with a slight gradient for depth */}
                      <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-white/20"></div>

                      {/* Experience Tag */}
                      <div className="relative -mt-1 px-3 py-1 bg-white/95 text-black text-[12.5px] font-bold rounded-sm shadow-xl border-t border-white">
                        {/* Small hole in the tag */}
                        <div className="absolute top-[7.5%] left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-800/20 rounded-full"></div>

                        <span className="relative z-10">
                          {formatExperience()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom attached bar */}
        <AnimatePresence>
          {showBottomBar && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-1/2 bottom-0 z-30 w-[280px] -translate-x-1/2 translate-y-1/2 px-6 py-3"
            >
              <div className="flex items-center justify-center">
                {/* Put anything here */}
                <SocialButtons />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global CSS for the border panning animation */}
        <style>{`
        @keyframes pan {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      </div>
    </motion.div>
  );
};

// Option 2: The "Layered Depth" - Bold & Dynamic
// Features: Overlapping glass panels and "floating" elements that react to scroll.
const AboutMeLayered = () => {
  return (
    <section
      id="about"
      className="relative py-24 flex flex-col items-center bg-[#030712] overflow-hidden"
    >
      {/* Decorative Floating Circle */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute top-20 right-[20%] w-32 h-32 rounded-full border border-blue-500/30 blur-sm"
      />

      <div className="relative z-10 max-w-4xl px-6">
        {/* Background Refraction Blobs */}
        <div className="absolute top-1/2 -left-0 w-36 h-36 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
        {/* <div className="absolute bottom-1/2 -right-0 w-40 h-40 bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse delay-700"></div> */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="bg-blue-950/20 border border-white/5 backdrop-blur-md p-8 md:p-12 rounded-tl-[4rem] rounded-br-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <h3 className="text-5xl md:text-7xl font-black text-white/15 absolute -top-12 left-10 select-none">
            Persona.cfg
          </h3>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-white mb-6">
                  Driven by logic, <br />
                  refined by <span className="text-blue-500">curiosity.</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  My approach to engineering is grounded in building systems
                  that are not just functional, but intelligent and scalable. I
                  focus on simplifying complex data workflows and transforming
                  them into reliable, automated platforms using modern AI and
                  cloud-native technologies - prioritizing reliability,
                  automation, and real-world impact.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  {/* <span className="text-slate-500 text-sm italic font-light tracking-wide">Seeking innovative solutions</span> */}
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="holographic-card p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors">
                <p className="text-xs text-blue-400 uppercase tracking-widest font-bold">
                  Mindset
                </p>
                <p className="text-sm text-slate-400">
                  Simplify Complexity,
                  <br /> Then Scale
                </p>
              </div>
              <div className="holographic-card p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-colors">
                <p className="text-xs text-blue-400 uppercase tracking-widest font-bold">
                  Process
                </p>
                <p className="text-sm text-slate-400">
                  Experiment - Optimize - Scale
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function App() {
  const [showResume, setShowResume] = useState(false);

  return (
    <BrowserRouter>
      <main className="relative bg-slate-950 min-h-screen overflow-x-hidden selection:bg-blue-500/30">
        {/* Persistent Background Effects */}
        {/* <div className="fixed inset-0 z-0"> */}
        <StarFall />
        <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
        {/* Deep Blue Glows for Theme */}
        {/* <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sky-800/20 blur-[120px]" /> */}
        {/* <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-900/20 blur-[120px]" /> */}

        <Routes>
          <Route
            path="/"
            element={
              <AnimatePresence mode="wait">
                <IntroCard
                  onShowResume={() => {
                    setShowResume(true);
                  }}
                />
              </AnimatePresence>
            }
          />
          <Route
            path="/kuber"
            element={
              <AnimatePresence mode="wait">
                <motion.div
                  key="main-portfolio"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "circOut" }}
                >
                  <ScrollProgress />
                  <Navbar
                    onShowResume={() => {
                      setShowResume(true);
                    }}
                  />
                  <Hero />
                  <SkillSnapshot />
                  <Projects />
                  <AboutMeLayered />
                  <About />
                  <TechStack />
                  <Certifications />
                  <Contact />
                  <Footer />
                </motion.div>
              </AnimatePresence>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
