import { motion } from "framer-motion";
import {
  SiReact,
  SiDbt,
  SiDocker,
  SiGithub,
  SiGooglebigquery,
  SiPython,
} from "react-icons/si";
import { GrGenai, GrMysql } from "react-icons/gr";
import { VscMcp } from "react-icons/vsc";

const skills = [
  {
    name: "Google Cloud Platform",
    icon: "/googlecloud.png",
    color: "#7061fb",
    size: "large",
    proficiency: 0.9,
  },
  {
    name: "Generative AI",
    icon: GrGenai,
    color: "#06B6D4",
    size: "medium",
    proficiency: 0.9,
  },
  {
    name: "Agentic AI",
    icon: "/adk.png",
    color: "#3178C6",
    size: "medium",
    proficiency: 0.9,
  },
  {
    name: "Model Context Protocol",
    icon: VscMcp,
    color: "#E11D48",
    size: "medium",
    proficiency: 0.9,
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    size: "small",
    proficiency: 0.8,
  },

  {
    name: "BigQuery",
    icon: SiGooglebigquery,
    color: "#FFFFFF",
    size: "small",
    proficiency: 0.9,
  },
  {
    name: "Cloud Run",
    icon: "/google-cloud-run-icon.png",
    color: "#4169E1",
    size: "small",
    proficiency: 0.9,
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    size: "small",
    proficiency: 0.9,
  },
  {
    name: "SQL",
    icon: GrMysql,
    color: "#339933",
    size: "small",
    proficiency: 0.9,
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    size: "small",
    proficiency: 0.9,
  },

  {
    name: "DBT",
    icon: SiDbt,
    color: "#47A248",
    size: "small",
    proficiency: 0.9,
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "#FFFFFF",
    size: "small",
    proficiency: 0.9,
  },
];

export const SkillSnapshot = () => {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">
          {/* DIGITAL <span className="text-blue-500">ARSENAL</span> */}
          SKILL <span className="text-blue-500">CONSOLE</span>
          <span className="align-super text-[25px] text-white/60 ml-1 uppercase">
            core
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[100px]">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`
              relative group overflow-hidden rounded-3xl border border-white/10 
              bg-blue-950/20 backdrop-blur-xl flex flex-col items-center justify-center gap-3
              ${skill.size === "large" ? "col-span-2 row-span-2" : ""}
              ${skill.size === "medium" ? "col-span-2 row-span-1" : ""}
              ${skill.size === "small" ? "col-span-1 row-span-1" : ""}
            `}
          >
            {/* Rising Fill Background */}

            {/* ✅ Rising BG Fill */}
            <div
              className="absolute bottom-0 left-0 w-full h-0 opacity-20 pointer-events-none 
               transition-all duration-500 ease-out group-hover:h-[var(--level)]"
              style={
                {
                  backgroundColor: skill.color,
                  "--level": `${skill.proficiency * 100}%`,
                } as React.CSSProperties
              }
            />

            {/* Subtle Gradient Glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
              }}
            />

            {typeof skill.icon === "string" ? (
              /* Render this if it is a public folder image string */
              <img
                src={skill.icon}
                alt={skill.name}
                style={{
                  width: skill.size === "large" ? "60px" : "32px",
                  height: skill.size === "large" ? "60px" : "32px",
                  objectFit: "contain",
                }}
                className="drop-shadow-lg z-10"
              />
            ) : (
              /* Render this if it is a standard React Icon component */
              <skill.icon
                size={skill.size === "large" ? 60 : 32}
                style={{ color: skill.color }}
                className="drop-shadow-lg z-10"
              />
            )}

            <span
              className={`z-10 font-medium text-blue-100/60 group-hover:text-white transition-colors
              ${skill.size === "large" ? "text-xl" : "text-xs uppercase tracking-tighter"}`}
            >
              {skill.name}
            </span>

            {/* Glass Highlight Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
