import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SiHomeadvisor } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { FaUserGraduate } from "react-icons/fa6";
import { GiStack } from "react-icons/gi";
import { ArrowDownToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    icon: <SiHomeadvisor size={30} />,
    href: "#",
    colors: ["#a955ff", "#ea51ff"],
  },
  {
    name: "Projects",
    icon: <GoProjectSymlink size={30} />,
    href: "#projects",
    colors: ["#56CCF2", "#2F80ED"],
  },
  {
    name: "About",
    icon: <FaUserGraduate size={30} />,
    href: "#about",
    colors: ["#FF9966", "#FF5E62"],
  },
  {
    name: "Skills",
    icon: <GiStack size={30} />,
    href: "#skills",
    colors: ["#80FF72", "#7EE8FA"],
  },
];

export default function Navbar({ onShowResume }: { onShowResume: () => void }) {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Logo/Name */}
        <div
          onClick={() => navigate("/")}
          className="text-white font-bold text-xl tracking-tighter cursor-pointer 
             transition-all duration-300 ease-out 
             hover:text-cyan-300 active:scale-95
             hover:scale-105 
             hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
        >
          KUBER<span className="text-cyan-400">_RAJ</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  style={
                    {
                      "--i": link.colors[0],
                      "--j": link.colors[1],
                    } as React.CSSProperties
                  }
                  className="
            group relative inline-flex justify-center items-center 
            w-[40px] h-[40px] rounded-full shadow-xl
            transition-all duration-500 overflow-hidden
            hover:w-[120px]
          "
                >
                  {/* Gradient Background */}
                  <div
                    className="
              absolute inset-0 rounded-full opacity-0 
              transition-all duration-500 group-hover:opacity-100
            "
                    style={{
                      background: `linear-gradient(45deg, ${link.colors[0]}, ${link.colors[1]})`,
                    }}
                  ></div>

                  {/* Glow Layer */}
                  <div
                    className="
              absolute top-[10px] w-full h-full rounded-full blur-[15px]
              opacity-0 transition-all duration-500 -z-10
              group-hover:opacity-50
            "
                    style={{
                      background: `linear-gradient(45deg, ${link.colors[0]}, ${link.colors[1]})`,
                    }}
                  ></div>

                  {/* Icon */}
                  <span
                    className="
              text-cyan-600 text-[1.7rem] transition-all 
              duration-500 delay-200 relative z-10
              group-hover:scale-0 group-hover:delay-0 group-hover:text-white
            "
                  >
                    {link.icon}
                  </span>

                  {/* Title */}
                  <span
                    className="
              absolute text-white text-sm tracking-wide
              scale-0 transition-all duration-500
              group-hover:scale-100 group-hover:delay-200
              z-10
            "
                  >
                    {link.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact CTA */}
        <Button
          onClick={onShowResume}
          className="rounded-full bg-white text-black hover:bg-cyan-50 h-10 px-6 font-bold"
        >
          Résumé
          <ArrowDownToLine />
        </Button>
      </div>
    </motion.nav>
  );
}
