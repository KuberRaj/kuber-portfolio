import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
  PaperPlaneTiltIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("sending");

    // These will use the Env variables once you add them to your .env file
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
        setTimeout(() => setStatus("idle"), 5000); // Reset button after 5s
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return (
    <section
      id="contact"
      className="py-32 px-6 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Text & Socials */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">
              Let's <br />
              <span className="text-blue-500">Connect.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Working on something impactful or building intelligent systems?
              I'm always open to conversations around AI, scalable platforms,
              and data-driven products. Let's connect and explore what we can
              build together.
            </p>
          </motion.div>

          <div className="flex gap-8 p-8">
            <SocialBtn
              icon={<SiGmail className="w-6 h-6" />}
              href="mailto:krk2000raj@gmail.com"
              label="Gmail"
              colorClass="text-red-500 border-red-500 shadow-red-500/50"
              hoverShadow="hover:shadow-[0_0_30px_rgba(239,68,68,1),0_0_40px_rgba(239,68,68,0.7)]"
            />
            <SocialBtn
              icon={<FaLinkedin className="w-6 h-6" />}
              href="https://linkedin.com/in/kuber-raj-kunal"
              label="LinkedIn"
              colorClass="text-blue-500 border-blue-500 shadow-blue-500/50"
              hoverShadow="hover:shadow-[0_0_30px_rgba(59,130,246,1),0_0_40px_rgba(59,130,246,0.7)]"
            />
            <SocialBtn
              icon={<FaGithub className="w-6 h-6 text-white" />}
              href="https://github.com/KuberRaj"
              label="GitHub"
              colorClass="text-purple-500 border-purple-500 shadow-purple-500/50"
              hoverShadow="hover:shadow-[0_0_30px_rgba(168,85,247,1),0_0_40px_rgba(168,85,247,0.7)]"
            />
          </div>
        </div>

        {/* Right Side: The Glass Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 rounded-[3rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-2xl"
        >
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <input type="hidden" name="subject" value="Portfolio Contact" />
            <input type="text" name="honeypot" className="hidden" />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-4">
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="John Doe"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/50 focus:bg-white/[0.07] outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-4">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="john@example.com"
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white focus:border-blue-500/50 focus:bg-white/[0.07] outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-4">
                Your Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="What's on your mind?"
                className="w-full px-6 py-4 rounded-[2rem] bg-white/5 border border-white/5 text-white focus:border-blue-500/50 focus:bg-white/[0.07] outline-none transition-all placeholder:text-white/10 resize-none"
              />
            </div>

            <button
              disabled={status === "sending"}
              className={`w-full h-16 rounded-full cursor-pointer font-bold flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 
                ${status === "success" ? "bg-emerald-500 text-white" : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]"}`}
            >
              {status === "idle" && (
                <>
                  <PaperPlaneTiltIcon size={20} weight="bold" /> SEND MESSAGE
                </>
              )}
              {status === "sending" && "INITIATING..."}
              {status === "success" && (
                <>
                  <CheckCircleIcon size={20} weight="bold" /> MESSAGE DELIVERED
                </>
              )}
              {status === "error" && (
                <>
                  <WarningIcon size={20} weight="bold" /> FAILED TO SEND
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

interface SocialBtnProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  colorClass: string; // Tailors border and text colors per brand
  hoverShadow: string; // Tailors the glowing shadow color per brand
}

function SocialBtn({
  icon,
  href,
  label,
  colorClass,
  hoverShadow,
}: SocialBtnProps) {
  return (
    <div className="relative group cursor-pointer text-[17px] rounded-xl pb-8">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block relative no-underline text-white"
      >
        {/* Layer Container */}
        <div
          className={`relative w-[55px] h-[55px] border-3 border-solid rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.7)] group-hover:-rotate-[35deg] group-hover:skew-x-[20deg] flex items-center justify-center ${colorClass} ${hoverShadow}`}
        >
          {/* 3D Background Spans */}
          <span
            className={`absolute inset-0 border border-solid rounded-full transition-all duration-300 opacity-0 group-hover:opacity-20 ${colorClass}`}
          />
          <span
            className={`absolute inset-0 border border-solid rounded-full transition-all duration-300 opacity-0 group-hover:opacity-40 group-hover:translate-x-[5px] group-hover:-translate-y-[5px] ${colorClass}`}
          />
          <span
            className={`absolute inset-0 border border-solid rounded-full transition-all duration-300 opacity-0 group-hover:opacity-60 group-hover:translate-x-[10px] group-hover:-translate-y-[10px] ${colorClass}`}
          />
          <span
            className={`absolute inset-0 border border-solid rounded-full transition-all duration-300 opacity-0 group-hover:opacity-80 group-hover:translate-x-[15px] group-hover:-translate-y-[15px] ${colorClass}`}
          />

          {/* Top Layer Icon Container */}
          <span
            className={`absolute inset-0 border border-solid rounded-full transition-all duration-300 flex items-center justify-center bg-zinc-900 group-hover:translate-x-[20px] group-hover:-translate-y-[20px] ${colorClass}`}
          >
            {icon}
          </span>
        </div>

        {/* Sliding Down Label Text */}
        <div
          className={`absolute left-1/2 -bottom-1 opacity-0 font-medium -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:-bottom-7 group-hover:opacity-100 whitespace-nowrap ${colorClass}`}
        >
          {label}
        </div>
      </a>
    </div>
  );
}
