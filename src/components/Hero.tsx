import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pt-24">
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
            <span className="text-white"> cloud-native technologies </span>
            - automating workflows, scaling reliably, and delivering measurable
            impact.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <Button
              size="lg"
              className="rounded-full h-14 px-10 text-lg cursor-pointer bg-white text-black hover:bg-white/90 shadow-xl transition-all hover:scale-105 active:scale-95"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch <FaArrowRight className="ml-2 text-blue-800" />
            </Button>
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
