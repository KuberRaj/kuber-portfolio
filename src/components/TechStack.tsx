import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Cpu,
  Database,
  Cloud,
  Brain,
  Workflow,
  Boxes,
  GitBranch,
} from "lucide-react";

// 1. Your Real, Expanded Tech Vault
const allTech = [
  // 🧠 AI / Agentic Systems
  {
    id: 1,
    name: "Google ADK",
    cat: "ai",
    icon: <Brain />,
    color: "text-purple-400",
  },
  {
    id: 2,
    name: "Vertex AI",
    cat: "ai",
    icon: <Brain />,
    color: "text-indigo-400",
  },
  {
    id: 3,
    name: "LLMs & Prompting",
    cat: "ai",
    icon: <Brain />,
    color: "text-pink-400",
  },
  {
    id: 4,
    name: "MCP / Multi-Agent",
    cat: "ai",
    icon: <Workflow />,
    color: "text-purple-500",
  },

  // ⚙️ Backend / Systems
  {
    id: 5,
    name: "Python",
    cat: "backend",
    icon: <Code />,
    color: "text-yellow-400",
  },
  {
    id: 6,
    name: "FastAPI",
    cat: "backend",
    icon: <Cpu />,
    color: "text-green-400",
  },
  {
    id: 7,
    name: "REST APIs",
    cat: "backend",
    icon: <Cpu />,
    color: "text-emerald-400",
  },

  // 🌐 Frontend (supporting role)
  {
    id: 8,
    name: "React",
    cat: "frontend",
    icon: <Code />,
    color: "text-blue-400",
  },
  {
    id: 9,
    name: "TypeScript",
    cat: "frontend",
    icon: <Code />,
    color: "text-cyan-400",
  },

  // 🛢️ Data / Analytics
  {
    id: 10,
    name: "BigQuery",
    cat: "data",
    icon: <Database />,
    color: "text-blue-500",
  },
  {
    id: 11,
    name: "dbt",
    cat: "data",
    icon: <Boxes />,
    color: "text-green-500",
  },
  {
    id: 12,
    name: "Airflow",
    cat: "data",
    icon: <Workflow />,
    color: "text-orange-400",
  },

  // ☁️ Cloud / Infra
  {
    id: 13,
    name: "GCP",
    cat: "cloud",
    icon: <Cloud />,
    color: "text-blue-400",
  },
  {
    id: 14,
    name: "Cloud Run",
    cat: "cloud",
    icon: <Cloud />,
    color: "text-sky-400",
  },
  {
    id: 15,
    name: "Firestore",
    cat: "cloud",
    icon: <Database />,
    color: "text-yellow-500",
  },
  {
    id: 16,
    name: "AWS (S3, Lambda)",
    cat: "cloud",
    icon: <Cloud />,
    color: "text-orange-400",
  },

  // 🔧 Dev / Infra Support
  {
    id: 17,
    name: "Docker",
    cat: "devops",
    icon: <Boxes />,
    color: "text-blue-500",
  },
  {
    id: 18,
    name: "GitHub",
    cat: "devops",
    icon: <GitBranch />,
    color: "text-white",
  },

  // 🛢️ Databases
  {
    id: 19,
    name: "SQL",
    cat: "database",
    icon: <Database />,
    color: "text-emerald-400",
  },
];

// 2. Categories (clean + meaningful)
const categories = [
  "all",
  "ai",
  "data",
  "backend",
  "frontend",
  "cloud",
  "database",
  "devops",
];

export default function TechStack() {
  const [filter, setFilter] = useState("ai");

  const filteredTech =
    filter === "all" ? allTech : allTech.filter((t) => t.cat === filter);

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto bg-slate-950">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">
          TECH <span className="text-blue-500">VAULT</span>
        </h2>

        {/* --- GLASS FILTER BAR --- */}
        <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- ANIMATED BENTO GRID --- */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="group p-8 rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-blue-500/30 flex flex-col items-center justify-center gap-4 text-center transition-colors"
            >
              <div
                className={`p-4 rounded-2xl bg-slate-900 border border-white/5 group-hover:border-blue-500/50 transition-all ${tech.color}`}
              >
                {tech.icon}
              </div>
              <span className="text-white font-bold tracking-tight text-sm uppercase">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
