import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowSquareOutIcon,
  CertificateIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";

// Use your certifications constant here
// const certifications = [ /* ... your values ... */ ];
const certifications = [
  {
    title: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "March 2026",
    image: "/ACE.jpeg",
    link: "https://www.credly.com/badges/e7f1e4a9-4e2e-49ba-9212-fc19e8d56377/public_url",
    icon: <CertificateIcon size={32} weight="fill" className="text-blue-400" />,
  },
  {
    title: "Generative AI Leader",
    issuer: "Google Cloud",
    date: "April 2026",
    image: "/GAIL.jpeg",
    link: "https://www.credly.com/badges/b3977983-bb2d-47f3-8065-62d26dc7aa6e/public_url",
    icon: <SealCheckIcon size={32} weight="fill" className="text-green-400" />,
  },
];

export default function CertificationCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Auto-play logic (stops on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % certifications.length);
    }, 3000); // 3-second pause
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-24 bg-[#020617] overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl w-full px-6 mb-12">
        <h2 className="text-4xl font-bold text-white italic tracking-tighter uppercase">
          Verified <span className="text-blue-500">Achievements</span>
        </h2>
      </div>

      {/* 2. Main Carousel Container */}
      <div
        className="relative w-full max-w-4xl h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            whileHover={{ scale: 1.05, zIndex: 10 }} // Pop up/enlarge on hover
            className="w-[90%] md:w-full h-full rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] cursor-pointer group"
          >
            {/* Certificate Image */}
            <img
              src={certifications[index].image}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-700"
            />

            {/* Glass Content Overlay */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-slate-950 to-transparent">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-white/10">
                  {certifications[index].icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {certifications[index].title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-black uppercase tracking-widest text-xs">
                      {certifications[index].issuer}
                    </span>
                    <span className="text-white/20 text-xs">
                      • {certifications[index].date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <a
                  href={certifications[index].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-blue-600 text-white shadow-xl hover:scale-110 transition-transform"
                >
                  <ArrowSquareOutIcon size={24} weight="bold" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Dot Indicators */}
      <div className="flex gap-3 mt-12">
        {certifications.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === i
                ? "w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
