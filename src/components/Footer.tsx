import { motion } from "framer-motion";
import {
  ArrowRightIcon,
} from "@phosphor-icons/react";
import {  FaLinkedin, FaPhone, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { VscGithub } from "react-icons/vsc";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#020617] pt-40 pb-12 overflow-hidden">
      {/* --- AURORA MESH BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary Blue Glow */}
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[80%] 
                        bg-blue-600/20 rounded-full blur-[120px] animate-aurora"
        />
        {/* Secondary Purple/Indigo Glow */}
        <div
          className="absolute -bottom-[10%] -right-[5%] w-[60%] h-[70%] 
                        bg-indigo-600/15 rounded-full blur-[100px] animate-aurora [animation-delay:2s]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Scrolling Marquee Header */}
        <div className="absolute top-0 w-full flex whitespace-nowrap opacity-[0.03] select-none">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="text-[12vw] font-black uppercase flex gap-20 items-center text-white"
          >
            <span>
              Work Together ✦ Let's Work ✦ Work Together ✦ Let's Work ✦
            </span>
          </motion.div>
        </div>

        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight leading-tight">
            Turning complex ideas into intelligent systems. <br />
            <span className="italic font-serif opacity-90">
              Let's collaborate.
            </span>
          </h2>

          <div className="relative inline-block group">
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full group-hover:bg-blue-400/50 transition-colors duration-500" />
            <button
              onClick={() => scrollToSection("contact")}
              className="relative px-12 cursor-pointer py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all active:scale-95 flex items-center gap-3"
            >
              Start a Conversation <ArrowRightIcon weight="bold" />
            </button>
          </div>
        </motion.div>

        {/* Footer Metadata */}
        <div className="w-full mt-20 pt-10 border-t border-white/5 flex flex-col items-center justify-center">
          {/* Social Icons Row */}
          <div className="flex items-center justify-center flex-row gap-6 z-10">
            <SocialIcon icon={<FaLinkedin size={24} strokeWidth={2}/>} href="https://linkedin.com/in/kuber-raj-kunal" className="hover:text-[#0077b5]"/>
            <SocialIcon icon={<VscGithub size={24} />} href="https://github.com/KuberRaj" className="hover:text-[#24292e]"/>
            <SocialIcon icon={<FaPhone size={24} strokeWidth={2}/>} href="tel: +916371649030" className="hover:text-[#0284c7]"/>
            <SocialIcon icon={<FaWhatsapp size={24} strokeWidth={2}/>} href="https://wa.me/916371649030?text=Hi%20Kunal%2C%20I%20came%20across%20your%20portfolio" className="hover:text-[#22c55e]"/>
            <SocialIcon icon={<SiGmail size={24} />} href="mailto:krk2000raj@gmail.com" className="hover:text-[#ef4444]"/>
          </div>

          {/* Copyright Row */}
          <p className="text-sm bg-white/5 backdrop-blur-md shadow-lg rounded-full font-bold p-1 text-white/50 uppercase tracking-[0.2em] text-center mt-3">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href, className }: { icon: React.ReactNode; href: string; className: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`social-icon bg-white/5 backdrop-blur-md shadow-lg ${className}`}
    >
      {icon}
    </a>
  );
}
