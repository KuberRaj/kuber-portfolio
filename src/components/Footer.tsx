import { motion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { FaLinkedin, FaPhone, FaWhatsapp } from "react-icons/fa";
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
            <div className="flex flex-col gap-6 max-w-sm mx-auto relative z-10">
              <button
                onClick={() => scrollToSection("contact")}
                className="group relative p-4 rounded-full backdrop-blur-xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 via-black-900/60 to-black/80 shadow-2xl hover:shadow-indigo-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-indigo-400/60 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-indigo-400/20 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex-1 text-left">
                    <p className="text-white/60 font-bold text-lg group-hover:text-white transition-colors duration-300 drop-shadow-sm">
                      Start a Conversation
                    </p>
                  </div>
                  <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRightIcon
                      weight="bold"
                      className="w-5 h-5 text-cyan-400 group-hover:text-indigo-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer Metadata */}
        <div className="w-full mt-20 pt-10 border-t border-white/5 flex flex-col items-center justify-center">
          {/* Social Icons Row */}
          <div className="flex items-center justify-center flex-row gap-6 z-10">
            <SocialIcon
              icon={<FaLinkedin size={24} strokeWidth={2} />}
              href="https://linkedin.com/in/kuber-raj-kunal"
              className="hover:text-[#0077b5]"
            />
            <SocialIcon
              icon={<VscGithub size={24} />}
              href="https://github.com/KuberRaj"
              className="hover:text-[#24292e]"
            />
            <SocialIcon
              icon={<FaPhone size={24} strokeWidth={2} />}
              href="tel: +916371649030"
              className="hover:text-[#0284c7]"
            />
            <SocialIcon
              icon={<FaWhatsapp size={24} strokeWidth={2} />}
              href="https://wa.me/916371649030?text=Hi%20Kunal%2C%20I%20came%20across%20your%20portfolio"
              className="hover:text-[#22c55e]"
            />
            <SocialIcon
              icon={<SiGmail size={24} />}
              href="mailto:krk2000raj@gmail.com"
              className="hover:text-[#ef4444]"
            />
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

function SocialIcon({
  icon,
  href,
  className,
}: {
  icon: React.ReactNode;
  href: string;
  className: string;
}) {
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
